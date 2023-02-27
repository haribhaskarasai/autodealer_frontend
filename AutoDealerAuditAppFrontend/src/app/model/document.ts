export class Document{
 
    id:number = 0;
    country:string = '';
    category : String = '';
    year:string = '';
    programCode:string = '';
    resourceType:string = '';
    documentTitle :string = '';
    document: string = '';
    revisionDate!:Date;
    revisionStatus!:boolean;
    documentStatus!: boolean;
    section: string = '';
    description: string = '';

}