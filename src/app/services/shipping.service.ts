import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ShippingMethod } from '../models/shipping-method';

@Injectable()
export class ShippingService {

  private url = 'http://localhost:3000/shipping-method';

  constructor(private http: Http) { }

  getAllShipping(): Observable<ShippingMethod[]> {
    return this.http.get(this.url)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error));
  }

  getShipping(id: String): Observable<ShippingMethod> {
    return this.http.get(this.url + '/' + id)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error));
  }

}
