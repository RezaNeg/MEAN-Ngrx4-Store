import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CustomerService {

  private url = 'http://localhost:3000/customer'

  constructor(private http: Http) { }

  create(customer: Customer): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.url, JSON.stringify(customer), options)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error));
  }

}
