import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../model/user';
import { userState } from '../store/dealer-store/selector';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl='http://localhost:7070/stgit.com/autodealerauditappapi/user/v1';
  user:User=new User;
  constructor(private httpClient:HttpClient, private store:Store, private cookies:CookieService) {
    this.store.select(userState).subscribe((data:any)=>(this.user=data))
   }

  generateToken(request:any){
    return this.httpClient.post<any>
    (`${this.baseUrl}/user/authenticate`,request,{responseType:'text' as 'json'})}

    welcome(token:string){
      let tokenStr='Bearer';
      const headers = new HttpHeaders().set('Authorization',tokenStr);
      return this.httpClient.get<string>("http://localhost:7070/",{headers,responseType:'text'as'json'})
    }

    isLoggedIn():Observable<boolean>{
    let isLoggedIn;
    const jwtToken = this.cookies.get('jwt_token')
   if(jwtToken!=""){
    const parsedJwt = JSON.parse(atob(jwtToken.split('.')[1]))
    if(parsedJwt.mailId===this.user.mailId){
      isLoggedIn=true;
      }else{
     isLoggedIn=false;
      }
   }else{
    isLoggedIn=false
    }
    return of(isLoggedIn);
  }
}
