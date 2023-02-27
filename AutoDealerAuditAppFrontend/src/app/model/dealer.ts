<<<<<<< HEAD
import { DealerAddress } from "src/Objects";

export class Dealer {
    businessCenter:string="";
    dba: string="";
    dealerCode:string="";
    dealerId: number=0;
    dealerName: string="";
    dealerPrincipal:string="";
    letterGreeting:string="";
    salesGroupSize: string="";
    dealerAddress!:DealerAddress
  constructor(
  businessCenter:string,
  dba: string,
  dealerCode:string,
  dealerId: number,
  dealerName: string,
  dealerPrincipal:string,
  letterGreeting:string,
  salesGroupSize: string,
  dealerAddress:DealerAddress
  ){}
=======
import { DealerAddress } from "./dealerAddress";

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
>>>>>>> 17e2620976464eec08aa20a6b82ff80b6ee083ef

}