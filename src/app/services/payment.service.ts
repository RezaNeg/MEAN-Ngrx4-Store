import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Payment } from '../models/payment';

@Injectable()
export class PaymentService {
  
  private url = 'http://localhost:3000/payment-methods';

  constructor(private http: Http) { }

  getActivePayments(): Observable<any> {
    return this.getAllPayments()
      .map((res) => 
        res.payment_methods.filter((payments) => payments.active == true))
  }

  getAllPayments(): Observable<any> {
    return this.http.get(this.url)
      .map((res: Response) => 
        res.json())
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    return Observable.throw(error.json() || 'Server error!');
  }
}
