import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { OrderService } from '../services/order.service';
import { User } from '../models/user';
import { ShippingStatus } from '../models/shipping-status';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: User;
  public ShippingStatus: typeof ShippingStatus = ShippingStatus;
  public isFinished: boolean = false;

  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getProfile()
    .subscribe(
      data => {
        this.user = data.user
        console.log("USER: ", this.user)
        if (this.user){
          this.orderService.loadOrders(this.user.id)
            .subscribe(
              data => {
                console.log ("ORDERS of current user: ", data.orders)
                this.user.orders = data.orders;
                console.log("UPDATED USER with ORDERS: ", this.user)
                console.log("user.orders: ", this.user.orders)  
               }
            )
        }
        this.isFinished = true
      },
      error => console.log("ERRRRR: ", error),
      () => this.isFinished = true
    );
   
  }




  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }

}
