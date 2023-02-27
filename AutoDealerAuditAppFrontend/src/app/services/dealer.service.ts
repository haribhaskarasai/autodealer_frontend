import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dealer } from 'src/Objects';

@Injectable({
  providedIn: 'root'
})
export class DealerService {
  url='http://localhost:7070/stgit.com/autodealerauditappapi/dealer/v1/dealers/2';

  constructor(private http:HttpClient) { }
  getDealerById(id:number):Observable<Dealer>{
    return this.http.get<Dealer>(`http://localhost:7070/stgit.com/autodealerauditappapi/dealer/v1/dealers/${id}`)
  }
  getDealers():Observable<Dealer[]>{
    return this.http.get<Dealer[]>(`http://localhost:7070/stgit.com/autodealerauditappapi/dealer/v1/dealers`)
  }
}
