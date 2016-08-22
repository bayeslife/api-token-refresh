import { Component,Injectable } from '@angular/core';
import { Http, Response, Headers }     from '@angular/http';

import { APIData } from './apidata';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { TokenService } from './token.service';


@Injectable()
export class APIClientService {

private token: string ="expiredtoken";

constructor(private http: Http,private tokenService: TokenService){
}

public get(url: string) : Promise<any> {
  let t = this;
  var headers = new Headers();
  headers.append('Authorization', this.token );
  let p= this.http.get(url,{headers: headers} ).toPromise()
    .then(function(response: Response){
      return response;
    })
    .catch(function(error){
      if(error.status==401){
          return t.tokenService.getToken()
            .then(function(tok){
              var headers = new Headers();
              headers.append('Authorization', tok );
              return t.http.get(url,{ headers: headers} ).toPromise()
                .then(function(val){
                  return Promise.resolve(val);
                })
                .catch(function(error){
                  console.error('Error after retrieving valid token', error);
                  return Promise.reject(error);
                });
          })
          .catch(function(error){
            console.error('Error retrieving valid token', error);
            return Promise.reject(error);
          });
      } else{
        console.error('Non authentication issue', error);
        return Promise.reject(error);
      }
    });
  return p;
  }

}
