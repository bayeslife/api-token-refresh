import { Component,Injectable } from '@angular/core';
import { Http, Response, Headers }     from '@angular/http';

import { APIData } from './apidata';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { APIClientService } from './api-client.service';


@Injectable()
export class APIService {

 private apiurl = "http://localhost:1080/api/stuff";

constructor(private http: APIClientService){
}

/*
 * Here is the api which returns some data and can throw 401 expections to
 * indicate the token provided has expired.
*/
getAPIData(): Promise<APIData> {
  let th=this;
  let p= this.http.get(this.apiurl)
  .then(function(response: Response){
    let r : any= response.json();
    return r;
  })
  .catch(this.handleError);
  return p;
}

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
