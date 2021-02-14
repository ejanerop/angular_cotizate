import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( public router: Router, private clientService : ClientsService ) { }

  ngOnInit(): void {
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  logout() {
    Swal.fire({
      icon : 'question',
      title : 'Está seguro que desea cerrar sesión?',
      allowOutsideClick : false,
      showCancelButton : true,
      confirmButtonColor : 'primary',
      confirmButtonText : 'Sí',
      cancelButtonText : 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.logout().subscribe( (resp:any) => {
          if (resp.status == 204) {
            this.router.navigateByUrl('/news');
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true
            })
            Toast.fire({
              icon: 'info',
              title: 'Sesión cerrado con éxito'
            });
          }
        });
      }
    });

  }

  isAuth(){
    return this.clientService.isAuth();
  }

}
