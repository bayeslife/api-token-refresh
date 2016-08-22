import { Component,OnInit } from '@angular/core';

import { APIService } from './api.service';
import { APIClientService } from './api-client.service';
import { TokenService } from './token.service';
import { APIData } from './apidata';

@Component({
  selector: 'my-app',
  template: 'API Data: Name: {{apidata.name}}',
  providers: [APIService,APIClientService,TokenService]
})
export class AppComponent implements OnInit{

  constructor(private apiService: APIService) {
  }

  apidata: APIData = new APIData();

  ngOnInit(): void {
    let t = this;
    t.apiService.getAPIData().then(function(data){
        t.apidata = data;
    })
  }
}
