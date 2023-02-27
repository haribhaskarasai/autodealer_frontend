import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, ReplaySubject } from 'rxjs';
import { Country } from 'src/app/model/country';
import { Section } from 'src/app/model/section';
import { DocumentService } from 'src/app/services/document/document.service';
import { DataExport, ReadDocumentComponent } from '../read-document/read-document.component';

@Component({
  selector: 'app-edit-selected-doc',
  templateUrl: './edit-selected-doc.component.html',
  styleUrls: ['./edit-selected-doc.component.css']
})
export class EditSelectedDocComponent implements OnInit {

  newDocForm !: Document;
  base64Output !: string;
  file !: File;
  filename !: String;
  countryList!:Country[];
  sectionList!:Section[];
  resourceList:string[]=["RSA", "SALES", "WARRANTY"]
  docStatusList:string[]=["Active","Inactive"]
  reviewStatusList:string[]=["Reviewed","Not Reviewed"]
  categoryList:string[]=["SURCHARGE","Type2","Type3"]
  constructor(private fb:UntypedFormBuilder, private documentService: DocumentService,public dialogRef: MatDialogRef<ReadDocumentComponent>,@Inject(MAT_DIALOG_DATA) public data: DataExport) { }

  ngOnInit(): void {
    this.documentService.getAllCountries().subscribe(res=>{
      this.countryList=res;
    })
    this.documentService.getAllSections().subscribe(res=>{
      this.sectionList=res;
    })
   // this.documentForm.patchValue()-->to be seen
  }

  onChangeReviewStatus(){
    this.documentForm.value.reviewStatus = this.documentForm.value.reviewStatus == "Reviewed"? true: false;
    console.log(this.documentForm.value.reviewStatus, "reviewStatus")
  }

  onChangeDocumentStatus(){
    this.documentForm.value.documentStatus = this.documentForm.value.documentStatus == "Active"? true: false;
    console.log(this.documentForm.value.documentStatus, "docStatus")
  }

  onSubmit(){ 
    console.log(this.documentForm.value)
    if(this.triggered){
      this.documentForm.value.documentTitle =  this.filename
      this.documentForm.value.document = this.base64Output
    }
    

    console.log(this.documentForm.value)
    //this.documentService.createDocument(this.documentForm.value).subscribe(data => console.log(data))
  }

  documentForm=this.fb.group({
    id:[this.data.data.id],
    country:[this.data.data.country,Validators.required],
    section:[this.data.data.section,Validators.required],
    resourceType:[this.data.data.resourceType,Validators.required],
    category:[this.data.data.category,Validators.required],
    programCode:[this.data.data.programCode,Validators.required],
    revisionDate:[this.data.data.revisionDate,Validators.required],
    document:[''],
    year:[this.data.data.year,Validators.required],
    documentStatus:[this.data.data.documentStatus,Validators.required],
    reviewStatus:[this.data.data.reviewStatus,Validators.required],
    documentTitle:[this.data.data.documentTitle.split("%").shift(),Validators.required],
    description:[this.data.data.description,Validators.required],
    user:[this.data.data.user]
  })
  
  triggered=false;
  onFileChange(event: any) {
    this.triggered=true;
    this.filename = this.documentForm.value.documentTitle + "%" + event.target.files[0].name
     
    this.file = event.target.files[0];
   
    this.convertFile(event.target.files[0]).subscribe((base64: any) => {
      this.base64Output = base64;
    });
  
}


convertFile(file : File) : Observable<string> {
  const result = new ReplaySubject<string>(1);
  const reader = new FileReader();
  
  reader.readAsBinaryString(file);
  reader.onload = (event: any) => result.next(btoa(event.target.result.toString()));
  
  return result;
}

}
