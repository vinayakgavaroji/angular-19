import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private _url = "http://localhost:3000/"

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any>{
    return this.http.get<any>(this._url + "users")
  }
}
