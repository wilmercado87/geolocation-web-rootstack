import { AuthService } from './../../services/auth.service';
import { Job } from './../../models/job';
import { GeolocationService } from './../../services/geolocation.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CONSTANT } from '../constants/constant';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {
  position: any;
  label: any;
  jobs: Job[] = [];
  jobsRes: Job[] = [];
  zoom: number = 2;

  constructor(
    private geolocationService: GeolocationService,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedOut()) {
      this.jobsRes = [];
      this.getJobs();
    }
  }

  getJobs() {
    this.geolocationService.getJobs().subscribe((object: any) => {
      this.jobs = object.data;

      this.jobs.forEach((element) => {
        this.jobsRes.push(this.fillJob(element));
        console.log('jobsRes:' + JSON.stringify(this.jobsRes));
      });
    });
  }

  fillJob(element: Job): Job {
    return {
      id: element.id,
      title: element.title,
      description: element.description,
      latitude: element.latitude,
      longitude: element.longitude,
      image: element.image,
      date: element.date,
      status: element.status,
      assigned_to: element.assigned_to,
      created_at: element.created_at,
      updated_at: element.updated_at,
      position: {
        lat: Number.parseFloat(element.latitude),
        lng: Number.parseFloat(element.longitude),
      },
      screen: this.fillScreen(element),
    };
  }

  fillScreen(element: Job): string {
    return (
      'assigned: ' +
      element.assigned_to +
      '\n' +
      'date: ' +
      this.datePipe.transform(element.date, CONSTANT.FORMAT_DATE) +
      '\n' +
      'created: ' +
      this.datePipe.transform(element.created_at, CONSTANT.FORMAT_DATE) +
      '\n' +
      'updated: ' +
      this.datePipe.transform(element.updated_at, CONSTANT.FORMAT_DATE) +
      '\n' +
      'description: ' +
      element.description +
      '\n' +
      'status: ' +
      element.status
    );
  }
}
