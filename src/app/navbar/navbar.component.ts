import { Component, OnInit, ViewContainerRef, Output, EventEmitter, Input, DoCheck } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { UserService } from '../services/user.service';
import { DropdownValue } from '../models/dropdownValue';
import { AppSetting } from '../config/app.config';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements DoCheck {
  private qty;

  private appSetting_logo = AppSetting.logo;
  private searchBoxVisible: boolean = false;

  constructor(
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    private userService: UserService,
    private cartService: CartService
  ) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngDoCheck() {
    // this.qty = JSON.parse(localStorage.getItem("cart"))
    //             .map(x => x["quantity"])
    //               .reduce((prev, cur) => {
    //                 return (prev + cur)
    //               }, 0)
    this.qty = this.cartService.getTotalQtyInCart();
  }

  getDropdownValues(): DropdownValue[] {
    if (this.userService.isLoggedIn()) {
      return [
        new DropdownValue("profile", "Profile"),
        // new DropdownValue("login", "Login"),
        // new DropdownValue("register", "Register"),
      ];
    }
    return [
      new DropdownValue("login", "Login"),
      new DropdownValue("register", "Register"),
    ];
  }

  toggleSearch(): void {
    this.searchBoxVisible = !this.searchBoxVisible;
  }
  
  handleSearchEmitter(event): void {
    if (event.action === 'close') {
      this.searchBoxVisible = false;
    }
    else if (event.action === 'search') {
      console.log(event.data);
    }
  }
}
