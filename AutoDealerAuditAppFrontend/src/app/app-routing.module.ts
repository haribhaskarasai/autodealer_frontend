import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthenticationGuard } from './auth-guard/authentication.guard';
import { AuditorsComponent } from './components/auditors/auditors.component';
import { CreateDocumentComponent } from './components/create-document/create-document.component';
import { DocumentDashboardComponent } from './components/document-dashboard/document-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ReadDocumentComponent } from './components/read-document/read-document.component';
import { SelectDealerComponent } from './components/select-dealer/select-dealer.component';
import { SideNavigationBarComponent } from './components/side-navigation-bar/side-navigation-bar.component';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:"login", component:LoginComponent},
  {path:"dealer", component: SelectDealerComponent , canActivate:[AuthenticationGuard] },
  {path:"auditors", component: AuditorsComponent, canActivate:[AuthenticationGuard]},
  {path:"document", component: ReadDocumentComponent, canActivate:[AuthenticationGuard]},
  {path:"create-document", component: CreateDocumentComponent, canActivate:[AuthenticationGuard]},
  {path:"read-document", component: ReadDocumentComponent, canActivate:[AuthenticationGuard]},
  {path:"document-dashboard", component: DocumentDashboardComponent, canActivate:[AuthenticationGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
