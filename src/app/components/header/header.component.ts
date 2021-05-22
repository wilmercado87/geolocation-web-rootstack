import { MessageService } from 'primeng/api';
import { User } from './../../models/user';
import { AuthService } from './../../services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CONSTANT } from '../constants/constant';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input()
  user!: User;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {}

  profile() {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: CONSTANT.MSG_AUTHORIZED_USER + '\n' + this.fillInfoUser(),
    });
  }

  logout() {
    console.log('logout');
    this.authService.logout();
    this.router.navigateByUrl(CONSTANT.LOGIN);
  }

  fillInfoUser(): string {
    return (
      'name: ' +
      this.user.name +
      '\n' +
      'email: ' +
      this.user.email +
      '\n' +
      'created: ' +
      this.datePipe.transform(this.user.created_at, CONSTANT.FORMAT_DATE) +
      '\n' +
      'updated: ' +
      this.datePipe.transform(this.user.updated_at, CONSTANT.FORMAT_DATE) +
      '\n'
    );
  }
}
