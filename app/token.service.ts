import { Injectable } from '@angular/core';
import { Http, Response, Headers }     from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TokenService {

 private tokenurl = "http://localhost:1080/api/token";

 constructor(private http: Http){
 }

 getToken(token: string): Promise<string> {
   let p= this.http.get(this.tokenurl)
     .toPromise()
     .then(function(response: Response){
       let r : any= response.json();
       return r.token;
     })
     .catch(this.handleError);
   return p;
 }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
