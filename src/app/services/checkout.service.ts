import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Customer } from '../models/customer';
import { Cart } from '../models/cart';
import { Order } from '../models/order';

@Injectable()
export class CheckoutService {

  private url = 'http://localhost:3000/order'

  constructor(private http: Http) { }

  createOrder(customer_id, total) {
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

  getOrder(id: String): Observable<Order> {
    return this.http.get(this.url + '/' + id)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error));
  }

}
