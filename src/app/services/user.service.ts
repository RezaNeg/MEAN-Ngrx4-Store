import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs/Rx';
import { tokenNotExpired } from 'angular2-jwt';
import { Subject }    from 'rxjs/Subject';
import { Http, RequestOptions, Headers, Response } from '@angular/http';


import { User } from '../models/User';
import { AuthService } from './auth.service';
import { AppSetting } from '../config/app.config';

@Injectable()
export class UserService {

  public isAuthenticated: boolean = false; 
  public currentUser : User;
  // public currentUser : User = new User();
  public loginObs$ : any;
  public socialObs$ : Observable<any>;
  public registerObs$ : Observable<any>;
  public authToken: any;
  public profileImage: string;
  public loggedIn: boolean = false;

  private url = 'http://localhost:3000/';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });
  
  constructor(
      private router: Router,
      private authService: AuthService,
      private http: Http
  ) { }

  localLogin(email: string, password: string):any {
    
    let user = JSON.stringify({
        email,
        password,
      });
    let loginObs$ = this.authService.loginUser(user);
    	loginObs$.subscribe(data => {
        console.log("DATA from node via cacheable for login: ", data);
        if (data.success){
            console.log("data.user:", data.user);
            console.log("data.token:", data.token);
            this.storeUserData(data.user, data.token); 
            console.log("current User: ", this.currentUser);
            this.isAuthenticated = true;
        }else{
            this.authService.cache$ = null;
        }
    });
    return loginObs$;
  }

  socialLogin( email: string, uid: string, name: string, provider: string, image: string ) : any {
    console.log('UserService.socialLogin: ' + email + ' ' + name + ' ' + provider);
    let user = JSON.stringify({email, uid, name, provider, image})
    // let user = {
    //     email: email,
    //     uid: uid,
    //     name: name,
    //     provider: provider,
    //     image: image
    // };
    let socialObs$ = this.authService.socialLoginUser(user);
    socialObs$.subscribe((data) => {
        if (data.success){
            this.storeUserData(data.user, data.token);
            console.log("current User: ", this.currentUser);
			this.isAuthenticated = true;
        }else{
            this.authService.cache$ = null;
          }
    }); 
    return socialObs$; 
  }

  register( firstname: string, lastname: string, email: string, password: string): any {
    console.log('UserService.register: ' + email + ' ' + password);
    let user = JSON.stringify({firstname, lastname, email, password})
    let registerObs$ = this.authService.registerUser(user);
    return registerObs$;
  } 
 

  logout(): Observable<any> {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.clear();    
      this.router.navigate(['/']);
      return Observable.of({});
  }

  getProfile(): Observable<any>{
    if (!this.isLoggedIn()){
      // 
      return Observable.of({});
    }
    let token = this.loadToken();
    return this.authService.getProfile(token)
    // .subscribe(data => {
    //   this.storeUserData(data.user, token);
    //   console.log("profile get from profile method: ", data);
    //   console.log("profile written to currentUser: ", this.currentUser);
    // });
  }

  updateUser(user): any {
    return this.http.put(this.url + 'users/', user, this.options)
    .map(res => res.json());
  }
  
  // getProfile(): User{
	// let token = this.loadToken();
  //   let getProfile$ = this.authService.getProfile(token);
  //   getProfile$.subscribe(data => {
	// 	this.storeUserData(data.user, token);
  //       console.log("profile got from profile method: ", data);
  //       console.log("profile written to currentUser: ", this.currentUser);
  //       return data.user;
  //   });
  //   return;
  // }

	getImageURL(): string{
		return this.profileImage = 
			this.currentUser.imageURL ? this.currentUser.imageURL : AppSetting.defaultProfileImage;
	}

  isLoggedIn(): boolean{
    return tokenNotExpired('id_token');
  }

	loadToken(): string{
		// const token = localStorage.getItem('id_token');
		// this.authToken = token;
		return localStorage.getItem('id_token');
	}

	storeUserData(user, token){
		localStorage.setItem('user', JSON.stringify(user));
		localStorage.setItem('id_token', token);
		this.currentUser = user;
		this.authToken = token;
	}
}
