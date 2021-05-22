import { AuthService } from './../../services/auth.service';
import { User } from './../../models/user';
import { GeolocationService } from './../../services/geolocation.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user!: User;

  constructor(
    private geolocationService: GeolocationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedOut()) {
      console.log('the session has expired or ended');
      this.router.navigateByUrl('/login');
      return;
    }

    this.getUser();
  }

  getUser() {
    this.geolocationService.getUser().subscribe((user) => {
      console.log('user:' + JSON.stringify(user));
      this.user = user;
    });
  }
}
