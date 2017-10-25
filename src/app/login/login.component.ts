import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { UserService } from '../services/user.service';

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

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastsManager
  ) { }

  ngOnInit() {
  }

  onSubmit(): void {
    this.userService.localLogin(this.loginForm.email, this.loginForm.password)
      .subscribe(data => {
        if (data.success) {
          this.router.navigate(['/profile']);
          console.log("Welcome : ", data.user)
        }
        else {
          this.toastr.error(data.msg, "Invalid credentials");
        }
      })
  }
}
