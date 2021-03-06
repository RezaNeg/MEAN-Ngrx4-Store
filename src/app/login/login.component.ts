import { Component, OnInit, Input, EventEmitter, ViewChild, Output, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { UserService } from '../services/user.service';
// import { CapslockDirective } from '../directives/capslock.directive'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginForm: any = {
    email: "",
    password: "",
  };
  private caps: boolean = false

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastsManager,
  ) { }
   
  ngOnInit() { 

  }

  capsEvent($event){
    this.caps = $event
  }

  onSubmit(): void {
    this.userService.localLogin(this.loginForm.email, this.loginForm.password)
      .subscribe(data => {
        console.log("DATA after login from NODE: ", data)
        if (data.success) {
          this.router.navigate(['/profile']);
          console.log("Welcome : ", data.user.firstname)
        }
        else {
          this.toastr.error(data.msg, "Invalid credentials");
        }
      })
  }
}
