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

  getDetailsById(email: string):Observable<any>{
    return this.http.get<any>(`${this._url}?email=${email}`);
  }

  getProfilesById(email: string):Observable<any>{
    return this.http.get<any>(`${this._uri}?email=${email}`);
  }

  saveProfile(body: any): Observable<any>{
    return this.http.post<any>(this._uri, body);
  }

}
