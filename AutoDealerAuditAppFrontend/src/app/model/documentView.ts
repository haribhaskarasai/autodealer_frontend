export class DocumentView{
 
    id:number = 0;
    country:string = '';
    category : String = '';
    year:string = '';
    programCode:string = '';
    resourceType:string = '';
    documentTitle :string = '';
    revisionDate!:Date;
    revisionStatus!:boolean;
    documentStatus!: boolean;
    section: string = '';
    description: string = '';

}