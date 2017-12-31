import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
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
