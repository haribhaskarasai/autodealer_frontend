import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Route, Router, RouterLink } from '@angular/router';
//import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';
import { saveAs as fileSaverSave } from 'file-saver';
import { DocumentService } from 'src/app/services/document/document.service';
import { Document } from 'src/Objects';
import { CreateDocumentComponent } from '../create-document/create-document.component';
import {MatDialog} from '@angular/material/dialog'
import { EditSelectedDocComponent } from '../edit-selected-doc/edit-selected-doc.component';
import { Store } from '@ngrx/store';
import { selectedDocIds } from 'src/app/store/document-store/document.selector';
export interface DataExport{
  data:any;
}
@Component({
  selector: 'app-read-document',
  templateUrl: './read-document.component.html',
  styleUrls: ['./read-document.component.css']
})
export class ReadDocumentComponent implements OnInit {

  documents:Document[] = [];
  countries:any;
  filename!:any;
  fileExtension!:any;

  isSelected:boolean=false;
  checkedList:any;
  checklist = [
    {id:1,value:'Elenor Anderson',isSelected:false},
    {id:2,value:'Caden Kunze',isSelected:true},
    {id:3,value:'Ms. Hortense Zulauf',isSelected:true},
    {id:4,value:'Grady Reichert',isSelected:false},
    {id:5,value:'Dejon Olson',isSelected:false},
    {id:6,value:'Jamir Pfannerstill',isSelected:false},
    {id:7,value:'Aracely Renner DVM',isSelected:false},
    {id:8,value:'Genoveva Luettgen',isSelected:false}
  ];

  multipleSelectedDocsIds: any[] = [];
  
  constructor(private store: Store ,private documentservice: DocumentService,private sanitizer: DomSanitizer,private router:Router,public dialog: MatDialog) { 
    store.select(selectedDocIds).subscribe(data => {console.log(data)})
  }

  ngOnInit(): void {
    this.getAllDocuments();
    //this.getAllCountries(); 
    this.isSelected=false;
    this.documentservice.getSelectedDocsIdList().subscribe(data =>{
      this.multipleSelectedDocsIds = data
    })
  }



  dataURLtoFile(
    document: Document
  ) {
    this.filename = document.documentTitle.split('%').pop()
    this.fileExtension = document.documentTitle.split('%').pop()?.split('.')?.pop()
    const dataurl = 'data:text/plain;base64,' + document.document;
    const arr:any = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    console.log(mime, "mimetype")
    const bstr = atob(arr[1]);
    console.log(bstr)
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
   
    fileSaverSave(new File([u8arr], this.filename, { type: this.fileExtension }));

  }

  getAllDocuments(){
   this.documentservice.getAllDocuments().subscribe({
    next:(data:any)=>{console.log("working"),this.documents=data}
   });   
  }


  openDialog() {
    const dialogRef = this.dialog.open(CreateDocumentComponent,{
      width:"80vw",
      height:"80vh",
      minHeight:"80vh",
      maxHeight:"500px",
      minWidth:"80vw",
      maxWidth:"400px"
    });
}
selectedDoc!:Document;
docSelected(doc:Document){
  this.selectedDoc=doc;
  this.openDialog2();
}
openDialog2() {
  const dialogRef = this.dialog.open(EditSelectedDocComponent,{
    width:"80vw",
    height:"80vh",
    minHeight:"80vh",
    maxHeight:"500px",
    minWidth:"80vw",
    maxWidth:"400px",
    data: {data: this.selectedDoc}
  });
}
}




  
  // onLoad(data:File){
  //   let url= this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(data))
  //   this.fileUrl = url;
  //   return url;
  // }

  // downloadFile(fileData: Blob,filename:string) {
  //   const blob = new Blob([fileData], {type:'DOCX/DOC'});
  //   const file = new File([blob], filename );
  //   FileSaver.saveAs(file);
  // }


    // getAllCountries(){
  // this.countries = this.documentservice.getAllCountries();
  // }
  // deleteDocument(id:number){
  //   console.log(id);
  //   this.documentservice.deleteDocumentById(id).subscribe(
  //     data => {
  //       console.log(data);
  //       this.router.navigate(['/']);
  //     },
  //     (error) => console.log(error));
    
  // }