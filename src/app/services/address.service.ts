import { Injectable } from '@angular/core';
import { Address } from '../models/address';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AddressService {

  private url = 'http://localhost:3000/address'

  constructor(private http: Http) { }

  createOrUpdate(address: Address): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log("ADDRESS: ", address)
    return this.http.post(this.url, JSON.stringify(address), options)
      .map((res: Response) => { 
        console.log("RES ADDRESS: ", res.json())  
        return res.json()
      })
      .catch((err: any) => Observable.throw(err.json().error));
  }

  loadUserAddress(address_id): Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url+ '/' + address_id , options)
      .map((res: Response) => { 
                                console.log("LOAD ADDRESS: ", res.json())
                                return res.json()
      }).catch((err: any) => Observable.throw(err.json().error));
    
  }

}
