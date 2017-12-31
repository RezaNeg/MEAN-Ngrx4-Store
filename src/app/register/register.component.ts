import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { UserService } from '../services/user.service';
import { AppSetting } from '../config/app.config';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  formError: string;
  formMsg: string;
  submitting = false;
  appSetting_logo = AppSetting.logo;

  constructor(private userService: UserService,
              private router: Router,
              // private appSetting: AppSetting,
              public toastr: ToastsManager) { }

  ngOnInit() {
  }
  onRegisterSubmit(registerForm: NgForm) {
    if (registerForm.valid) {
      console.log('submitting...', registerForm);
      this.submitting = true;
      this.formError = null;

      this.userService.register(registerForm.value.firstname,
                                registerForm.value.lastname,
                                registerForm.value.email,
                                registerForm.value.password
                                )
        .subscribe((data) => {
          console.log("Data back from server: ", data);
          if (data.success){
            this.formMsg = data.msg;
            setTimeout(()=>{ this.formMsg = "Login please..."}, 2000);
            this.submitting = false;
            setTimeout(()=>{ this.formMsg = ""}, 4000);
            // this.router.navigate(['/login']);
          }else{
            this.submitting = false;
            this.formError = data.msg;
            setTimeout(()=>{ this.formError = ""}, 2000);
          }        
        },
        (err)=> {
          this.submitting = false;
          console.log('got error: ', err);
          this.formError = err;
        }
      );
    }
  }


}
