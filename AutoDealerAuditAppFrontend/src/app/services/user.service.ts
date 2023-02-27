import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetails } from '../model/userDetails';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "http://localhost:7070/stgit.com/autodealerauditappapi/user/v1"
  constructor(private http:HttpClient) { }

  getUser(mailId:string):Observable<UserDetails>{
    return this.http.get<UserDetails>(`${this.baseUrl}/user/${mailId}`)
  }
}
