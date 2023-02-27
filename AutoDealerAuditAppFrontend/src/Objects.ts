

export class Dealer{
    dealerId!: number;
    dealerCode!: string;
    dealerName!: string;
    businessCenter!: string;
    dba!:string;
    dealerPrincipal!:string;
    letterGreeting!: string;
    salesGroupSize!:string;
    dealerAddress!:DealerAddress;

}
export class DealerAddress{
    dealerAddressId!:number;
    mail!:string;
    addressLane1!:string;
    addressLane2!:string;
    city!:string;
    state!:string;
    country!:string;
    zip!:string;
    phone!:string;
}
export class Document{
    id!:number;
    country!:string;
    category !: String;
    year!:string;
    programCode!:string;
    resourceType!:string;
    documentTitle :string = "";
    document: string = "";
    revisionDate!:Date;
    revisionStatus!:boolean;
    documentStatus!: boolean;
    section!: string;
    description!: string;
}




