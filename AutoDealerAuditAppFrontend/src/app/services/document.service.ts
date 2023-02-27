import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  url='http://localhost:7070/stgit.com/autodealerauditappapi/document/v1';

  constructor(private http:HttpClient) { }
  createDocument(document: Document): Observable<Document>{
    return this.http.post<Document>(`${this.url}/document`, document);
  }
}
