import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { saveAs as fileSaverSave } from 'file-saver';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Document } from 'src/app/model/document';
import { DocumentService } from 'src/app/services/document/document.service';

import {MatDialog} from '@angular/material/dialog'
import { CreateDocumentComponent } from '../create-document/create-document.component';
import { EditSelectedDocComponent } from '../edit-selected-doc/edit-selected-doc.component';
import { MatSelect } from '@angular/material/select';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { UntypedFormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addMultipleDocIds, removeMultipleDocIds } from 'src/app/store/document-store/document.action';
import { Observable } from 'rxjs';
import { selectedDocIds } from 'src/app/store/document-store/document.selector';
import { metaReducerLocalStorage } from 'src/app/store/document-store/document.reducer';
import { UserDetails } from 'src/app/model/userDetails';
import { userState } from 'src/app/store/dealer-store/selector';
//import * as _ from 'lodash'

export interface DataExport{
  data:any;
}

@Component({
  selector: 'app-document-dashboard',
  templateUrl: './document-dashboard.component.html',
  styleUrls: ['./document-dashboard.component.css']
})
export class DocumentDashboardComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  countriesList : any[] = [];

  multipleSelectedDocsIds : number[] = [];

  multipleDocEntries$ !: Observable<Number[]>
  isChecked :boolean = false;
  user:UserDetails=new UserDetails();
  selectedDoc!:Document;
  docUrl!: string;
  filename!:any;
  fileExtension!:any;
  selection = new SelectionModel<any>(true, []);

  yearFilter = new UntypedFormControl('');
  categoryFilter = new UntypedFormControl('');
  revDateFilter = new UntypedFormControl('');
  docTitleFilter = new UntypedFormControl('');
  progCodeFilter = new UntypedFormControl('');
  countryFilter = new UntypedFormControl('');
  resTypeFilter = new UntypedFormControl('');
  revStatusFilter = new UntypedFormControl('');
  docStatusFilter = new UntypedFormControl('');

  dataSource = new MatTableDataSource();

  docStatusList:string[]=["Active","Archived"]
  revisionStatusList:string[]=["reviewed","Not Reviewed"]

  columnsToDisplay = ['select','country','year', 'programCode', 'resourceType', 'documentTitle', 'category', 'revisionDate', 'revisionStatus','documentStatus','document','task'];
  filterValues = {
    id:'',
    country: '',
    year:'',
    programCode: '',
    resourceType: '',
    documentTitle: '',
    category:'',
    revisionDate:'',
    revisionStatus: '',
    documentStatus: ''
  };
  documents: any;

  constructor(private documentservice: DocumentService,public dialog: MatDialog, private store: Store) {
    this.getAllDocuments()
    this.dataSource.filterPredicate = this.createFilter();
    //store.select(selectedDocIds).subscribe(data => {console.log(data)})
    //this.multipleDocEntries$ = store.select(selectedDocIds);
    this.store.select(userState).subscribe({
      next:(data:any)=> this.user=data
    })
  }

  ngAfterViewInit(): void {
    //console.log(this.dataSource.data)
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    //this.paginator.lastPage = () => this.yourMethodToTrigger();
  }

  ngOnInit(): void {

    this.documentservice.getSelectedDocsIdList().subscribe(data =>{
      this.multipleSelectedDocsIds = data
    })

    this.categoryFilter.valueChanges
    .subscribe(
      category => {
        this.filterValues.category = category;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.yearFilter.valueChanges
      .subscribe(
        year => {
          this.filterValues.year = year;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.progCodeFilter.valueChanges
      .subscribe(
        programCode => {
          this.filterValues.programCode = programCode;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.resTypeFilter.valueChanges
      .subscribe(
        resType => {
          this.filterValues.resourceType = resType;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.docTitleFilter.valueChanges
      .subscribe(
        docTitle => {
          this.filterValues.documentTitle = docTitle;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )

    this.countryFilter.valueChanges
    .subscribe(
      country => {
        this.filterValues.country = country;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.revStatusFilter.valueChanges
    .subscribe(
      revStatus => {
        this.filterValues.revisionStatus = revStatus;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.revDateFilter.valueChanges
    .subscribe(
      revDate => {
        this.filterValues.revisionDate = revDate;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.docStatusFilter.valueChanges
    .subscribe(
      documentStatus => {
        this.filterValues.documentStatus = documentStatus;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.documentservice.getAllCountries().subscribe(res=>{
      this.countriesList=res;
    })

    

  }

  isAllSelected() {
    
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row: any) => this.selection.select(row));
  }

  getAllDocuments(){
    this.documentservice.readAllDocumentsWODoc().subscribe({
     next:(data:any)=>{this.dataSource.data=data}
    });   
   }

  createFilter(): (data: any, filter: string) => boolean {
    
    let filterFunction = function (data: any, filter: any): boolean {
      //console.log(data)
      let searchTerms = JSON.parse(filter);
      //console.log(searchTerms)
      return data.programCode.toLowerCase().indexOf(searchTerms.programCode.toLowerCase()) !== -1
        && data.year.toString().toLowerCase().indexOf(searchTerms.year.toLowerCase()) !== -1
        && data.resourceType.toLowerCase().indexOf(searchTerms.resourceType.toLowerCase()) !== -1
        && data.country.toLowerCase().indexOf(searchTerms.country.toLowerCase()) !== -1
        && data.documentTitle.split('%').shift().toLowerCase().indexOf(searchTerms.documentTitle.toLowerCase()) !== -1
        && data.category.toLowerCase().indexOf(searchTerms.category.toLowerCase()) !== -1
        && data.revisionDate.toString().indexOf(searchTerms.revisionDate) !== -1
        && (data.documentStatus ? "Active": "Archived").indexOf((searchTerms.documentStatus)) !== -1
        && (data.revisionStatus ? "reviewed": "Not Reviewed").indexOf(searchTerms.revisionStatus) !== -1;
    }
   

    return filterFunction;
  }


  dataURLtoFile(
    documentId: number,
    documentTitle: string
  ) 
  {
  
    this.filename = documentTitle.split('%').pop()
    this.fileExtension = documentTitle.split('%').pop()?.split('.')?.pop()

    this.documentservice.readDocInDocument(documentId).subscribe((strData: string) => {
    const bstr = atob(strData);

    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
   
    fileSaverSave(new File([u8arr], this.filename, { type: this.fileExtension }));
    })
    

  }

  //-----------------------------for mat dialog------------------------
  openDialog() {
    if(this.user.role=="Manager" || this.user.role=="Admin"){
      const dialogRef = this.dialog.open(CreateDocumentComponent,{
        width:"80vw",
        height:"80vh",
        minHeight:"80vh",
        maxHeight:"500px",
        minWidth:"80vw",
        maxWidth:"400px"
      });
    }else{
      alert("You are not having access to New Document")
    }
   
  //-------------------------------------------------------------------

}

checkboxSelect(event: MatCheckboxChange){
  console.log(event.checked)
  
  if(event.checked){
    this.documentservice.getAllDocuments().subscribe((data: any) => {
       this.documentservice.setSelectedDocsIdList(data.map((val: any) => {return val.id}))
    }) 
    this.multipleSelectedDocsIds = [...new Set(this.multipleSelectedDocsIds)]
  }else {
    this.documentservice.setSelectedDocsIdList([])
  }
 
  return event
}

checkboxMultipleSelect(event: MatCheckboxChange, docId: Document){
  
  this.isChecked = true
  if(this.isChecked){
    this.store.dispatch(addMultipleDocIds(docId));
    
  } else{
    event.checked = false
    this.store.dispatch(removeMultipleDocIds(docId));
  }
  
  return event
}


docSelected(doc:Document){
  if(this.user.role=="Manager" || this.user.role=="Admin"){
    this.selectedDoc=doc;
  this.openDialog2();
  }else{
    alert("You are not having access to Edit Document")
  }
}

deleteDoc(documentId:number){
  if(this.user.role=="Manager" || this.user.role=="Admin"){
    this.documentservice.deleteDocument(documentId).subscribe((data)=>{console.log(data)})
    window.location.reload()
  }else{
    alert("You are not having access to Delete Document")
  }
  
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
