import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { Payment } from 'src/app/models/payment.model';
import { ClientsService } from 'src/app/services/clients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  allClients : Client[] = [];
  clients : Client[] = [];
  termino : string = '';

  constructor( private clientService : ClientsService, private router : Router ) { }

  ngOnInit(): void {
    this.refreshUsers();
  }

  edit(id : number){
    this.router.navigate(['users', id]);
  }

  new(){
    this.router.navigate(['users', 'new']);
  }

  delete(id : number){
    Swal.fire({
      icon : 'question',
      title : 'Está seguro que desea eliminar el usuario?',
      text : 'Ten en cuenta que se eliminarán todos los registros de pago.',
      allowOutsideClick : false,
      showCancelButton : true,
      confirmButtonColor : 'primary',
      confirmButtonText : 'Sí',
      cancelButtonText : 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.deleteClient(id).subscribe( (resp:any) => {
          if (resp.status == 204) {
            this.refreshUsers();
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true
            })
            Toast.fire({
              icon: 'success',
              title: 'Usuario eliminado con éxito'
            });
          }
        });
      }
    });
  }

  refreshUsers(){
    this.allClients = [];
    this.clients = [];
    this.clientService.getClients().subscribe((data:any)=>{
      for (const item of data) {
        let payments : Payment[] = [];
        let client = new Client(item.id, item.nick, item.account, item.ip_address, payments);
        client.active_account = item.active_account;
        this.clients.push(client);
      }
      this.clients.sort((a, b) => Number(a.ip_address.split(".")[3]) - Number(b.ip_address.split(".")[3]));
      this.allClients = this.clients;
    });
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

}
