import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Customer } from '../models/customer';
import { Cart } from '../models/cart';

@Injectable()
export class CheckoutService {

  private url = 'http://localhost:3000/order'

  constructor(private http: Http) { }

  createOrder(customer_id, total: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let body = JSON.stringify({
      user_id: customer_id,
      total: total
    });

    return this.http.post(this.url, body, options)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error));
  }

}
