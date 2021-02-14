
import { Payment } from "./payment.model";


 export class Client {

  id         : number;
  nick       : string;
  ip_address : string;
  payments   : Payment[];

  constructor( id:number, nick:string, ip_address:string, payments? : Payment[] ) {
    this.id = id;
    this.nick = nick;
    this.ip_address = ip_address;
    this.payments = payments ? payments : [] ;
  }

  statusOfMonth(monthNumber:number){

    let today = new Date().getMonth() + 1;

    let payment : Payment | undefined = this.payments.find(item => {
      return item.month == monthNumber
    });

    if (payment === undefined) {
      return today >= monthNumber ? 'Pendiente' : '' ;
    } else {
      return payment.status();
    }

  }

  isCool(monthNumber:number){

    return this.statusOfMonth(monthNumber) == 'Al día' ? true : false;

  }
}
