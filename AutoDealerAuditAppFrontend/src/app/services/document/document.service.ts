import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Country } from 'src/app/model/country';
import { DocumentView } from 'src/app/model/documentView';
import { Section } from 'src/app/model/section';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  url='http://localhost:7070/stgit.com/autodealerauditappapi/document/v1';

  private selectedDocsIdList = new BehaviorSubject([]);

  public setSelectedDocsIdList(docsIdList: any){
    this.selectedDocsIdList.next(docsIdList)
  }

  public getSelectedDocsIdList(){
    return this.selectedDocsIdList
  }

  constructor(private http:HttpClient) { }

  createDocument(document: Document): Observable<Document>{
    return this.http.post<Document>(`${this.url}/document`, document);
  }

  getAllDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.url}/getAllDocuments`);
  }
  getAllCountries():Observable<Country[]>{
    return this.http.get<Country[]>(`${this.url}/countries`)
  }
  getAllSections():Observable<Section[]>{
    return this.http.get<Section[]>(`${this.url}/sections`)
  }

  readAllDocumentsWODoc():Observable<DocumentView[]>{
    return this.http.get<DocumentView[]>(`${this.url}/getAllDocumentswoDocs`)
  }

  
  readDocInDocument(id: number):Observable<string>{
    return this.http.get<string>(`${this.url}/readDocInDocument?id=${id}`)
  }

  deleteDocument(documentId:number):Observable<string>{
    return this.http.delete<string>(`${this.url}/deleteDocument/${documentId}`)
  }

}
