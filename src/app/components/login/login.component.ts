import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { CONSTANT } from '../constants/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login() {
    this.messageService.clear('bc');
    const formValue = this.formLogin.value;

    if (formValue.email && formValue.password) {
      this.authService
        .login(formValue.email, formValue.password)
        .subscribe((authResult) => {
          if (authResult) {
            this.setSession(authResult);
            console.log('User is logged in');
            this.router.navigateByUrl(CONSTANT.HOME);
          } else {
            this.messageService.add({key: 'bc', severity:'error', summary: 'Error', detail: CONSTANT.MSG_UNAUTHORIZED_USER});
            console.log('Unauthorized');
          }
        });
    }
  }

  private setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expires_in, 'second');
    localStorage.setItem(CONSTANT.ACCESS_TOKEN, authResult.access_token);
    localStorage.setItem(CONSTANT.EXPIRES_IN, JSON.stringify(expiresAt.valueOf()));
  }
}
