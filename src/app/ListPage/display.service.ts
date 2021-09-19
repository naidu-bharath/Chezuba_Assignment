import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  constructor(private _http:HttpClient) { }

  POST_Call():Observable<any[]>{
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this._http.get<any[]>('https://jsonplaceholder.typicode.com/posts',{ headers })
  }
}
