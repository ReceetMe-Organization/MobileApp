import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the HomeTsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HomeTsProvider {

  constructor(public http: Http) {
    console.log('Hello HomeTsProvider Provider');
  }
  getJsonData(){
    return this.http.get('/home.json').map(res => res.json());
  }


}
