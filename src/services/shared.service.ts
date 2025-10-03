import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private _url = "http://localhost:3000/users"
  private _uri = "http://localhost:3000/profiles"

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any>{
    return this.http.get<any>(this._url)
  }

  getDetailsByEmailId(email: string):Observable<any>{
    return this.http.get<any>(`${this._url}?email=${email}`);
  }

  getProfilesByEmail(email: string):Observable<any>{
    return this.http.get<any>(`${this._uri}?email=${email}`);
    
  }

}
