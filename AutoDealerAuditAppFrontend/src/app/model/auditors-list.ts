import { Auditor } from "./auditor";
import { RefAuditor } from "./refAuditor";

export class AuditorsList {
    auditAuditorId:number=0;
    auditor:RefAuditor={
        auditorId:0
    };
    workAllocation:number=0;

    constructor(auditAuditorId:number, auditorId:number, workAllocation:number){
        this.auditAuditorId=auditAuditorId;
        this.auditor.auditorId=auditorId;
        this.workAllocation=workAllocation;
    }

}