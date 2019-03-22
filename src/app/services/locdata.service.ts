import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocdataService {

  constructor(private http: HttpClient) { }

  getLoc() {
  	console.log("in getLoc");
    return this.http.get('http://ip-api.com/json')
  }
}
