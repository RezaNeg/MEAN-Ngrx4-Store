import { Component, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DropdownComponent } from './dropdown/dropdown.component';
import { UserService } from './services/user.service';
import { DropdownValue } from './models/dropdownValue';
import { AppSetting } from './config/app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private appSetting_logo = AppSetting.logo;
  private searchBoxVisible: boolean = false;

  constructor(
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    private userService: UserService,
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  getDropdownValues(): DropdownValue[] {
    if (this.userService.isLoggedIn()) {
      return [
        new DropdownValue("profile", "Profile"),
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
