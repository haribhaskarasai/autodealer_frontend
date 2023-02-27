
import { AuditorsList } from "./auditors-list";

export class Audit {
    auditId:number=0;
    dealerId:number=0;
    auditType:number= 0
    comments:string="";
    dateAssigned:string|null=""
    noOfMonths:number= 0;
    reason: string="";
    reportsLanguage:number= 0;
    auditAuditors:AuditorsList[]=[]

    constructor(auditId:number,dealerId:number,auditType:number,comments:string,dateAssigned:string|null,noOfMonths:number,
        reason: string,reportsLanguage:number,auditAuditors:AuditorsList[]){
            this.auditId=auditId;
            this.dealerId=dealerId;
            this.auditType=auditType;
            this.comments=comments;
            this.dateAssigned=dateAssigned;
            this.noOfMonths=noOfMonths;
            this.reason=reason;
            this.reportsLanguage=reportsLanguage;
            this.auditAuditors=auditAuditors;


    }
}