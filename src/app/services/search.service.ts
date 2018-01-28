import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, Observer } from 'rxjs/Rx';
// import { HttpClient, HttpParams } from '@angular/common/http';



@Injectable()
export class SearchService {
  private url = 'http://localhost:3000/product';
  private limit = 3

  
  constructor(private http: Http) { }

  search(term: string): Observable<any>{
    let myHeaders = new Headers()
    myHeaders.set('Content-Type', 'application/json'); 

    let myParams = new URLSearchParams()
    myParams.set('query', term);

    let options = new RequestOptions({ headers: myHeaders, params: myParams});
    
    let data1 = {
      search: term
    }
    let data2 = {
      params: term
    }

    console.log ("TERM to search: ", term)
    return this.http.get(`${this.url}?query=${term}&limit=${this.limit}`, options)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error))
  }
}



// multiple params:
    // // Initialize Params Object
    // let Params = new HttpParams();
    
    //     // Begin assigning parameters
    //     Params = Params.append('firstParameter', parameters.valueOne);
    //     Params = Params.append('secondParameter', parameters.valueTwo);