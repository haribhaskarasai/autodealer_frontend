import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auditor } from '../../model/auditor';
import { Auditors } from '../../model/auditors';

@Injectable({
  providedIn: 'root'
})
export class AuditorsService {

  constructor(private http:HttpClient) { }

  private baseUrl = "http://localhost:7070/stgit.com/autodealerauditappapi/auditor/v1"
  
  getAuditorsList():Observable<Auditor[]>{
    return this.http.get<any>(`${this.baseUrl}/auditors`);
  }
  
  

}
