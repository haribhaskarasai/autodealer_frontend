import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Audit } from 'src/app/model/audit';
import { Auditor } from 'src/app/model/auditor';
import { Auditors } from 'src/app/model/auditors';
import { AuditorsList } from 'src/app/model/auditors-list';
import { PersistComponents } from 'src/app/model/persist';
import { UserDetails } from 'src/app/model/userDetails';
import { AuditorsService } from 'src/app/services/auditors.service';
import { AuditserviceService } from 'src/app/services/auditservice.service';
import { DealerService } from 'src/app/services/dealer.service';
import { DocumentService } from 'src/app/services/document/document.service';
import { addDealer, persistComps } from 'src/app/store/dealer-store/action';
import { persistCompsState, selectDealer, userState } from 'src/app/store/dealer-store/selector';
import { Dealer } from 'src/Objects';


@Component({
  selector: 'select-dealer',
  templateUrl: './select-dealer.component.html',
  styleUrls: ['./select-dealer.component.css']
})
export class SelectDealerComponent implements OnInit, AfterViewInit {


  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(private router: Router, private cookies: CookieService, private store: Store, private documnetService: DocumentService, private dealerService: DealerService, private fb: FormBuilder, private auditorService: AuditorsService, private auditService: AuditserviceService) {

    this.dataSource.filterPredicate = this.createFilter();

    this.validateTheUser();

    dealerService.getDealers().subscribe({
      next: (data: any) => { this.dataSource.data = data, console.log(data) }
    })


    this.auditorService.getAuditorsList().subscribe(
      {
        next: (data: any) => { this.auditorsList = data, console.log(data) }
      }
    )

    this.store.select(persistCompsState).subscribe({
      next: (data: PersistComponents) => {
        this.formsPersistentValues = data,
          console.log(data)
      }
    })

    this.store.select(userState).subscribe({
      next: (data: any) => this.user = data
    })

  }


  dealersList: any[] = []
  auditorsList: Auditor[] = [];
  selectedAuditors: Auditor[] = [];
  workAllocatedAuditors: AuditorsList[] = [];
  user: UserDetails = new UserDetails();
  dealer: any = {}
  showAuditors: boolean = false;
  totalWorkAssigned: number = 0;
  reportsLanguage: string = "";
  auditType: string = "";
  isDealerSelected: boolean = false;
  isPlanAuditClicked: boolean = false;
  isDashboardClicked: boolean = true;
  formsPersistentValues: PersistComponents = new PersistComponents();

  auditForm = new UntypedFormGroup({
    auditType: new UntypedFormControl(0, [Validators.required]),
    comments: new UntypedFormControl('', [Validators.required]),
    dateAssigned: new UntypedFormControl('', [Validators.required]),
    noOfMonths: new UntypedFormControl(0, [Validators.required]),
    reason: new UntypedFormControl('', [Validators.required]),
    reportsLanguage: new UntypedFormControl(0, [Validators.required]),
  })

  dealerInfo = this.fb.group({
    businessCenter: ['', Validators.required],
    dealerCode: ['', Validators.required],
    dealerName: ['', Validators.required],
    dba: ['', Validators.required],
    dealerPrincipal: ['', Validators.required],
    letterGreeting: ['', Validators.required],
    salesGroupSize: ['', Validators.required],

    dealerAddress: this.fb.group({
      addressLane1: ['', Validators.required],
      state: ['', Validators.required],
      addressLane2: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      phone: ['', Validators.required],
      mail: ['', Validators.required],

    })

  })

  /** Slect dealers List related   */

  dealerCodeFilter = new UntypedFormControl('');
  businessCenterFilter = new UntypedFormControl('');
  dealerNameFilter = new UntypedFormControl('');
  dealerStateFilter = new UntypedFormControl('');
  countryFilter = new UntypedFormControl('');

  dataSource = new MatTableDataSource();

  columnsToDisplay = ['dealerCode', 'businessCenter', 'dealerName', 'state', 'country']

  filterValues = {
    dealerCode: '',
    businessCenter: '',
    dealerName: '',
    state: '',
    country: ''
  }

  ngAfterViewInit(): void {
    this.dataSource.sortingDataAccessor = (dealer: any, property) => {
      switch (property) {
        case 'state': return dealer.dealerAddress.state;
        case 'country': return dealer.dealerAddress.country;
        default: return dealer[property];
      }
    };
    this.dataSource.sort = this.sort;

    console.log(this.auditorsList)
  }

  ngOnInit(): void {

    this.dealerCodeFilter.valueChanges
      .subscribe(
        dealerCode => {
          this.filterValues.dealerCode = dealerCode
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )

    this.businessCenterFilter.valueChanges
      .subscribe(
        businessCenter => {
          this.filterValues.businessCenter = businessCenter;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )

    this.dealerNameFilter.valueChanges
      .subscribe(
        dealerName => {
          this.filterValues.dealerName = dealerName;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )

    this.dealerStateFilter.valueChanges
      .subscribe(
        dealerState => {
          this.filterValues.state = dealerState;
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


  }

  createFilter(): (data: any, filter: string) => boolean {

    let filterFunction = function (data: any, filter: any): boolean {
      console.log(data)
      let searchTerms = JSON.parse(filter);
      console.log(searchTerms)
      return data.dealerCode.toLowerCase().indexOf(searchTerms.dealerCode.toLowerCase()) !== -1
        && data.businessCenter.toLowerCase().indexOf(searchTerms.businessCenter.toLowerCase()) !== -1
        && data.dealerName.toLowerCase().indexOf(searchTerms.dealerName.toLowerCase()) !== -1
        && data.dealerAddress.country.toLowerCase().indexOf(searchTerms.country.toLowerCase()) !== -1
        && data.dealerAddress.state.toLowerCase().indexOf(searchTerms.state.toLowerCase()) !== -1;
    }


    return filterFunction;
  }

  selectDealer(dealerData: any) {
    this.store.dispatch(addDealer(dealerData))
    this.store.select(selectDealer).subscribe({
      next: (data: Dealer) => { this.dealer = data, this.isDealerSelected = true }
    })
    this.onClickOnDealersInfo()
    this.dealerInfo.patchValue(dealerData);
  }

  dataStoringAndGettingFromStore(boolVals: PersistComponents) {
    this.store.dispatch(persistComps(boolVals))
    this.store.select(persistCompsState).subscribe({
      next: (data: PersistComponents) => {
        this.formsPersistentValues = data
      }
    })
  }
  onClickOnDealersList() {
    let tempVals: PersistComponents = new PersistComponents()
    tempVals.showDealersList = true;
    tempVals.showDealerData = false;
    tempVals.showCreateAudit = false;
    tempVals.showReviewSubmit = false;
    this.dataStoringAndGettingFromStore(tempVals);
  }
  onClickOnDealersInfo() {

    if (this.isDealerSelected) {
      let tempVals: PersistComponents = new PersistComponents()
      tempVals.showDealersList = false;
      tempVals.showDealerData = true;
      tempVals.showCreateAudit = false;
      tempVals.showReviewSubmit = false;
      this.dataStoringAndGettingFromStore(tempVals);
    } else {
      alert("Select the dealer for viewing dealer info")
    }
  }
  onClickOnAssignAudit() {
    let tempVals: PersistComponents = new PersistComponents()
    tempVals.showDealersList = false;
    tempVals.showDealerData = false;
    tempVals.showCreateAudit = true;
    tempVals.showReviewSubmit = false;
    this.dataStoringAndGettingFromStore(tempVals);
  }
  onClickOnReviewAudit() {
    let tempVals: PersistComponents = new PersistComponents()
    tempVals.showDealersList = false;
    tempVals.showDealerData = false;
    tempVals.showCreateAudit = false;
    tempVals.showReviewSubmit = true;
    this.dataStoringAndGettingFromStore(tempVals);
  }
  showAuditorsList() {
    this.showAuditors = true;
  }
  onSelectAuditor(auditor: Auditor) {
    const found = this.selectedAuditors.find(e => e.auditorId == auditor.auditorId)
    if (found) {
      alert("Already auditor assigned for this audit")
    } else {
      this.selectedAuditors.push(auditor)
      this.showAuditors = false;
    }

  }

  onAssigningWork(e: any, allocatedAuditor: any) {
    let workAllocation: number = parseInt(e.target.value)
    if (this.totalWorkAssigned + workAllocation > 100) {
      alert("Work allocation exceeded 100%")
    } else {
      this.totalWorkAssigned = this.totalWorkAssigned + workAllocation;
      this.workAllocatedAuditors.push(new AuditorsList(0, allocatedAuditor.auditorId, workAllocation))
    }

  }

  onSelectOfAuditType(e: any) {
    let value = parseInt(e.target.value)
    switch (value) {
      case 0:
        return this.auditType = "RSA"
      case 1:
        return this.auditType = "SALES"
      case 2:
        return this.auditType = "WARRANTY"
      default:
        return this.auditType = ""
    }
  }

  onSelectOfReportsLanguage(e: any) {
    let value = parseInt(e.target.value)
    switch (value) {
      case 0:
        return this.reportsLanguage = "English"
      case 1:
        return this.reportsLanguage = "Spanish"
      case 2:
        return this.reportsLanguage = "French"
      default:
        return this.reportsLanguage = ""
    }
  }

  onClickOnCreateAudit() {
    if (this.user.role == "Manager" || this.user.role == "Admin") {
      this.isPlanAuditClicked = true;
      this.isDashboardClicked = false;
    } else {
      alert("You are not having access to create Audit")
    }
  }

  onClickOnDashBoard() {
    this.isDashboardClicked = true;
    this.isPlanAuditClicked = false;
  }

  validateTheUser() {
    if (this.user.role == "Manager" || this.user.role == "Admin") {
      this.isPlanAuditClicked = true;
      this.isDashboardClicked = false;
    } else {
      this.isPlanAuditClicked = false;
      this.isDashboardClicked = true;
    }
  }
  onSearchOfAuditors(e: any) {

  }

  onClickOnBack() {
    this.onClickOnDealersList();
  }
  onClickOnNext() {
    this.onClickOnAssignAudit();
  }
  onClickOnCancel() {
    this.onClickOnDealersList();
    this.dealer = {};
    this.selectedAuditors = []
    window.location.reload();
  }
  onClickOnBack1() {
    this.onClickOnDealersInfo();
  }
  onClickOnNext1() {
    this.onClickOnReviewAudit();
  }
  onClickOnBack2() {
    this.onClickOnAssignAudit();
  }

  onLogout(){
    this.router.navigate(['/login']);
    this.cookies.delete('jwt_token')
    window.localStorage.clear();
    window.location.reload();
  }
  onClickOnSubmit() {
    if (this.workAllocatedAuditors.length == 0) {
      alert("Audit cannot be created without auditors")
    } else {
      const audit = new Audit(0, this.dealer.dealerId, parseInt(this.auditForm.value.auditType), this.auditForm.value.comments, this.auditForm.value.dateAssigned, parseInt(this.auditForm.value.noOfMonths), this.auditForm.value.reason, this.auditForm.value.reportsLanguage, this.workAllocatedAuditors)
      this.auditService.createAudit(audit).subscribe({
        next: (data: any) => {
          console.log(data)
          alert("Audit created  successfully")
        }
      })
    }

  }

}