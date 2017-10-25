import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

import { User } from '../models/user';
import { cacheable } from './cacheable';

@Injectable()
export class AuthService {

  public token: string;
  private auth: User = null;
  private url = 'http://localhost:3000/';
  private jwtHelper: JwtHelper = new JwtHelper();
  private observable: Observable<any>;
  public cache$: Observable<any>;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) {
    // let user = this.getAuthedUser();
    // this.token = localStorage.getItem('token');
  }
  
  registerUser(user){
    return this.http.post(this.url + 'users/signup', user, this.options)
      .map(res => res.json());
  }

  loginUser(user){
    if (this.cache$) {
      return this.cache$;
    }else{
      this.cache$ = cacheable<any>(this.http.post(this.url + 'users/login', user, this.options));
      return this.cache$.map( res => res.json());
    }
  }
  
  socialLoginUser(user){
    if (this.cache$) {
      return this.cache$;
    }else{
      this.cache$ = cacheable<any>(this.http.post(this.url + 'users/auth/social', user, this.options));
      return this.cache$.map( res => res.json());
    }
  }

  getProfile(token){
    let headers = new Headers();
    console.log("auth token: ", token);
    headers.append('Authorization', token);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + 'users/profile', {headers: headers})
      .map(res => res.json());
  }
}