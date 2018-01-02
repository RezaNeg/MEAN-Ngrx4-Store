import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Order } from '../models/order'

@Injectable()
export class OrderService {
  private url = 'http://localhost:3000/'

  constructor(private http: Http) { }

  loadOrders(user_id): Observable<any> {
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + 'orders/'+ user_id)
                    .map(res => res.json())
                    .catch(this.handleError);
  }


  loadOrderItems(order_id): Observable<any> {
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + 'order-items/'+ order_id)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  createOrderItem(quantity, price, product_id, order_id): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let body = JSON.stringify({
      quantity: quantity,
      price: price,
      productId : product_id,
      orderId: order_id
    });

    return this.http.post(this.url + 'order-items/' + order_id, body, options)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error));
  }




  private handleError (error: Response | any) {
    let errMsg: string;

    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    console.error("ERROR: ", errMsg);
    return Observable.throw(errMsg);
  }
}
