import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { Country } from 'src/app/model/country';
import { Section } from 'src/app/model/section';
import { DocumentService } from 'src/app/services/document/document.service';
import { Document } from 'src/Objects';

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.css']
})
export class CreateDocumentComponent implements OnInit {

  newDocForm !: Document;
  base64Output !: string;
  docStatus !: boolean
  revisionStatus !: boolean
  file !: File;
  filename !: String;
  countryList!:Country[];
  sectionList!:Section[];
  resourceList:string[]=["RSA", "SALES", "WARRANTY"]

  docStatusList:string[]=["Active","Inactive"]
  reviewStatusList:string[]=["Not Reviewed","Reviewed"]
  categoryList:string[]=["SURCHARGE","Type2","Type3"]
  constructor(private fb:FormBuilder, private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documentService.getAllCountries().subscribe(res=>{
      this.countryList=res;
    })
    this.documentService.getAllSections().subscribe(res=>{
      this.sectionList=res;
    })

    
  }

  onChangeReviewStatus(){
    // this.revisionStatus = this.documentForm.value.reviewStatus == "Reviewed"? true: false;
    
    // console.log(this.documentForm.value.reviewStatus, "reviewStatus")
  }

  onChangeDocumentStatus(){
    this.docStatus = this.documentForm.value.documentStatus == "Active"? true: false;
    console.log(this.documentForm.value.documentStatus, "docStatus")
  }

  onSubmit(){ 
    // console.log(this.documentForm.value)
    // this.documentForm.value.revisionStatus = this.documentForm.value.revisionStatus == "Reviewed"? true: false;
    // this.documentForm.value.documentStatus = this.documentForm.value.documentStatus == "Active"? true: false;
    // this.documentForm.value.documentTitle =  this.filename
    // this.documentForm.value.document = this.base64Output

    // this.documentService.createDocument(this.documentForm.value).subscribe({
    //   next: (data:any) => {console.log("************after send too backend**********8"),console.log(data)}
    // })
  }

  documentForm=this.fb.group({
    country:['',Validators.required],
    section:['',Validators.required],
    resourceType:['',Validators.required],
    category:['',Validators.required],
    programCode:['',Validators.required],
    revisionDate:['',Validators.required],
    document:['',[Validators.required]],
    year:['',Validators.required],
    documentStatus:['Active',Validators.required],
    revisionStatus:['Not Reviewed',Validators.required],
    documentTitle:['',Validators.required],
    description:['',Validators.required],
    user:{
      userId:3
    }
  })

  onFileChange(event: any) {
    
    this.filename = this.documentForm.value.documentTitle + "%" + event.target.files[0].name
     
    this.file = event.target.files[0];
   
    this.convertFile(event.target.files[0]).subscribe(base64 => {
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
