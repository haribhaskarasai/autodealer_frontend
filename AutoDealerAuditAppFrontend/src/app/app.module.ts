import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateAuditComponent } from './components/create-audit/create-audit.component';
import { CreateDealerComponent } from './components/create-dealer/create-dealer.component';
import { AssignAuditComponent } from './components/assign-audit/assign-audit.component';
import { AuditorsComponent } from './components/auditors/auditors.component';
import { SideNavigationBarComponent } from './components/side-navigation-bar/side-navigation-bar.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SelectDealerComponent } from './components/select-dealer/select-dealer.component';
import { CreateDocumentComponent } from './components/create-document/create-document.component';
import { ReadDocumentComponent } from './components/read-document/read-document.component';
import { DocumentDashboardComponent } from './components/document-dashboard/document-dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { EditSelectedDocComponent } from './components/edit-selected-doc/edit-selected-doc.component';
import { StoreModule } from '@ngrx/store';
import { dealerReducer, metaReducerLocalStorage, persistReducer, userReducer } from './store/dealer-store/reducer';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { docIdReducer } from './store/document-store/document.reducer';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';



@NgModule({
  declarations: [
    AppComponent,
    CreateAuditComponent,
    CreateDealerComponent,
    AssignAuditComponent,
    AuditorsComponent,
    SideNavigationBarComponent,
    DocumentDashboardComponent,
    LoginComponent,
    SelectDealerComponent,
    DocumentDashboardComponent,
    CreateDocumentComponent,
    ReadDocumentComponent,
    EditSelectedDocComponent,
    ForgotpasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    MatSidenavModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatCardModule,
    MatToolbarModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatCheckboxModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    StoreModule.forRoot({dealerEntry:dealerReducer,pesistSelector:persistReducer,userSelector:userReducer,docIdEntries: docIdReducer},{metaReducers:[metaReducerLocalStorage]}),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
