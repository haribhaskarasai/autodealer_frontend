import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Audit } from '../model/audit';

@Injectable({
  providedIn: 'root'
})
export class AuditserviceService {

  baseUrl="http://localhost:7070/stgit.com/autodealerauditappapi/audit/v1"

  constructor(private http:HttpClient) { }
  createAudit(object:Audit):Observable<Audit>{
    return this.http.post<Audit>(`${this.baseUrl}/audit`,object)
  }
}
