import { User } from './../../models/user';
import { AuthService } from './../../services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  user!: User;

  constructor(
    private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
  }

  logout(){
    console.log('logout');
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
