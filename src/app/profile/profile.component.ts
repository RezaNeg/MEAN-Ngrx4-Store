import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { ShippingStatus } from '../models/shipping-status';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private user: User
  private ShippingStatus: typeof ShippingStatus = ShippingStatus;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setUser(this.authService.getAuthedUser());
  }

  private setUser(user: User): void {
    this.user = user;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
