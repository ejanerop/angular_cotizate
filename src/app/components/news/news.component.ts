import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { New } from 'src/app/models/new.model';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news : New[] = [];

  constructor( private clientService : ClientsService, private router : Router ) { }

  ngOnInit(): void {
    this.clientService.getNews().subscribe((data : any) =>{
      for (const item of data) {
        let portalNew = new New(item.id, item.title, item.description, item.src);
        this.news.push(portalNew);
      }
    });
  }

  edit(id : number){
    this.router.navigate(['news', id]);
  }

  new() {
    this.router.navigate(['news', 'new']);
  }

}
