import { Component, OnInit } from '@angular/core';
import { AuditorsService } from 'src/app/services/auditors.service';

@Component({
  selector: 'auditors',
  templateUrl: './auditors.component.html',
  styleUrls: ['./auditors.component.css']
})
export class AuditorsComponent implements OnInit {

  auditorsList : any;

  constructor(private auditorService:AuditorsService) { }

  ngOnInit(): void {
    
    this.auditorService.getAuditorsList().subscribe(
      (data) => {
        console.log(data);
        this.auditorsList = data;
      }
    )
    
  }
 

}
