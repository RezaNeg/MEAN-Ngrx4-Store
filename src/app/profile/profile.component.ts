import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
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
  private isFinished: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {

    
    this.userService.getProfile()
    .subscribe(
      user => {
        this.setUser(user);
      },
      error => console.log(error),
      () => this.isFinished = true
    );
      
    
  }

  private setUser(user: User): void {
    this.user = user;
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }

}
