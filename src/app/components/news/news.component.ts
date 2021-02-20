import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { New } from 'src/app/models/new.model';
import { ClientsService } from 'src/app/services/clients.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news : New[] = [];

  constructor( private clientService : ClientsService, private router : Router ) { }

  ngOnInit(): void {
    this.refreshNews();
  }

  edit(id : number){
    this.router.navigate(['news', id]);
  }

  new() {
    this.router.navigate(['news', 'new']);
  }

  imagePath(portalNew : New){
    return this.clientService.getImagePath(portalNew);
  }

  refreshNews(){
    this.news = [];
    this.clientService.getNews().subscribe((data : any) =>{
      for (const item of data) {
        let portalNew = new New(item.id, item.title, item.description, item.src);
        this.news.push(portalNew);
      }
    });
  }

  delete(id : number){
    Swal.fire({
      icon : 'question',
      title : 'Está seguro que desea eliminar la noticia?',
      text : 'Se eliminara también la imagen adjunta.',
      allowOutsideClick : false,
      showCancelButton : true,
      confirmButtonColor : 'primary',
      confirmButtonText : 'Sí',
      cancelButtonText : 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.deleteNew(id).subscribe( (resp:any) => {
          if (resp.status == 204) {
            this.refreshNews();
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true
            })
            Toast.fire({
              icon: 'success',
              title: 'Noticia eliminada con éxito'
            });
          }
        });
      }
    });
  }

}
