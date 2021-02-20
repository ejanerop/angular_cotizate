import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { Payment } from 'src/app/models/payment.model';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-home',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  months : number[] = [1,2,3,4,5,6,7,8,9,10,11,12];

  clients : Client[] = [];
  clientsFull : Client[] = [];
  termino : string = '';
  ip : string = '';


  constructor(public clientService : ClientsService) {

  }

  ngOnInit(): void {
    this.clientService.getIp().subscribe((data:any)=>{
      this.ip = data;
    });

    if (this.isAuth()) {
      this.clientService.getClients().subscribe((data:any)=>{
        for (const item of data) {
          let payments : Payment[] = [];
          for (const paymentItem of item.payments) {
            let payment = new Payment(paymentItem.cant, paymentItem.month, paymentItem.year);
            payments.push(payment);
          }
          let client = new Client(item.id, item.nick, item.account, item.ip_address, payments);
          client.active_account = item.active_account;
          this.clients.push(client);
        }
        this.clients.sort((a, b) => Number(a.ip_address.split(".")[3]) - Number(b.ip_address.split(".")[3]));
        this.clientsFull = this.clients;
      });
    } else {
      this.clientService.getClientByIp().subscribe((data:any)=>{
        for (const item of data) {
          let payments : Payment[] = [];
          for (const paymentItem of item.payments) {
            let payment = new Payment(paymentItem.cant, paymentItem.month, paymentItem.year);
            payments.push(payment);
          }
          let client = new Client(item.id, item.nick, item.account, item.ip_address, payments);
          client.active_account = item.active_account;
          this.clients.push(client);
        }
        this.clients.sort((a, b) => Number(a.ip_address.split(".")[3]) - Number(b.ip_address.split(".")[3]));
        this.clientsFull = this.clients;
      });
    }
  }

  find(termino : string){
    if (termino == '') {
      this.clients = this.clientsFull;
    } else {
      this.clients = this.clientsFull.filter(item => {
        if (item.nick.toLowerCase().includes(termino.toLowerCase())  || item.ip_address.toLowerCase().includes(termino.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      });
    }
  }


  isAuth(){
    return this.clientService.isAuth();
  }

  total(){
    let total = 0;
    this.clientsFull.forEach((client) =>{
      for (const payment of client.payments) {
        total += payment.cant;
      }
    });
    return total;
  }

  totalOf(month : number) : number{
    let total : number = 0;
    this.clientsFull.forEach(client => {
      total += client.payments[month-1].cant;
    });
    return total;
  }

  totalAccounts(active : boolean){
    let total : number = 0;
    this.clientsFull.forEach(client => {
      if ((client.active_account && active) || (!client.active_account && !active)) {
      total++;
      }
    });
    return total;
  }


}
