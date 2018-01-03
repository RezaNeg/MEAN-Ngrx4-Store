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

  loadOrders(userId): Observable<any> {
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + 'orders/'+ userId)
                    .map(res => res.json())
                    .catch(this.handleError);
  }


  loadOrderItems(orderId): Observable<any> {
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + 'order-items/'+ orderId)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  createOrderItem(quantity, price, productId, orderId): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let body = JSON.stringify({
      quantity: quantity,
      price: price,
      productId : productId,
      orderId: orderId
    });

    return this.http.post(this.url + 'order-items/' + orderId, body, options)
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
