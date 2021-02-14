import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { Payment } from 'src/app/models/payment.model';
import { ClientsService } from 'src/app/services/clients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styles: [
  ]
})
export class PaymentsComponent implements OnInit {

  allClients : Client[] = [];
  clients : Client[] = [];
  clientsToPay : Client[] = [];
  form : FormGroup;
  months : number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  termino : string = '';

  constructor(public router: Router, public clientService : ClientsService, private fb : FormBuilder) {

    this.form = new FormGroup({});
    this.createForm();
    this.termino = '';

  }

  ngOnInit(): void {
    this.clientService.getClients().subscribe((data:any)=>{
      for (const item of data) {
        let payments : Payment[] = [];
        for (const paymentItem of item.payments) {
          let payment = new Payment(paymentItem.cant, paymentItem.month, paymentItem.year);
          payments.push(payment);
        }
        let client = new Client(item.id, item.nick, item.ip_address, payments);
        this.clients.push(client);
      }
      this.clients.sort((a, b) => Number(a.ip_address.split(".")[3]) - Number(b.ip_address.split(".")[3]));
      this.allClients = this.clients;
    });
  }

  get users(){
    return this.form.get('users') as FormArray;
  }

  payments(user : number){
    return this.users.at(user).get('payments') as FormArray;
  }

  invalidPayment(i : number, j : number){
    return this.payments(i).at(j).invalid;
  }

  addUserToPay(i : number){

    const client = this.clients[i];
    this.clientsToPay.push(client);
    //this.clientsToPay.sort((a, b) => a.id - b.id);
    this.clients.splice(i, 1);
    this.allClients.filter(item => item.id != client.id);

    this.users.push(this.fb.group({
      id : client.id,
      ip_address : client.ip_address,
      nick : client.nick,
      payments : this.fb.array([])
    }));
    for (let index = 1; index < 13; index++) {
      let payments : FormArray = this.users.controls[this.users.length-1].get('payments') as FormArray;
      payments.push(this.fb.control(client.payments[index-1].cant, Validators.pattern("[0-9]{1,3}$")));

    }
  }

  removeUserFromPay(i : number){

    const client = this.clientsToPay[i];
    this.clients.push(client);
    //this.allClients.push(client);
    this.clients.sort((a, b) => Number(a.ip_address.split(".")[3]) - Number(b.ip_address.split(".")[3]));
    this.clientsToPay.splice(i, 1);
    this.users.removeAt(i);

  }

  find(termino : string){
    if (termino == '') {
      this.clients = this.allClients;
    } else {
      this.clients = this.clients.filter(item => {
        if (item.nick.toLowerCase().includes(termino.toLowerCase()) || item.ip_address.toLowerCase().includes(termino.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      });
    }

  }

  save() {

    if (this.form.invalid) {
      return;
    }
    if (this.users.length == 0){
      Swal.fire({
        icon : 'error',
        title : 'Que estas metiendo!',
        text : 'Papa lee el cartel amarillo. :)',
        timer : 4000
      });
      return;
    }

    Swal.fire({
      icon : 'info',
      title : 'Espere',
      text : 'Guardando info',
      allowOutsideClick : false,
      timer : 10000
    });
    Swal.showLoading();

    console.log(this.form.value);

    this.clientService.addPayments(this.form.value).subscribe(resp => {
      console.log(resp);
      if (resp.status == 201) {
        Swal.fire({
          icon : 'success',
          title : 'Correcto!',
          text : 'Pagos guardados con éxito.' ,
          allowOutsideClick : false,
          timer : 10000
        }).then((result) => {
          if (result.isConfirmed) {
          }
        });
      }
    }, error => {
      console.error(error);
      Swal.fire({
        icon : 'error',
        title : 'Ups!',
        text : 'Algo salió mal. Escribele a Eric a ver que se jodió.' ,
        allowOutsideClick : false,
        timer : 10000
      });
    });

  }

  createForm() {
    this.form = this.fb.group({
      users: this.fb.array([])
    });
  }

  fillMonth(month : number){

    for (let user of this.users.controls) {
      let payments =  user.get('payments') as FormArray;
      payments.at(month-1).setValue(75);
    }
  }
}
