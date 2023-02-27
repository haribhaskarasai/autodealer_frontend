import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'assign-audit',
  templateUrl: './assign-audit.component.html',
  styleUrls: ['./assign-audit.component.css']
})
export class AssignAuditComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }


}
