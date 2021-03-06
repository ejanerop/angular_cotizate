import { Component, OnInit } from '@angular/core';
import { New } from 'src/app/models/new.model';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-news',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  news : New[] = [];

  constructor(private clientService : ClientsService) { }

  ngOnInit(): void {
    this.clientService.getNews().subscribe((data : any) =>{

      for (const item of data) {
        let portalNew = new New(item.id, item.title, item.description, item.src);
        this.news.push(portalNew);
      }
    });
  }

  even(i : number){
    return  i%2==0 ;
  }

  isAuth(){
    return this.clientService.isAuth();
  }

  imagePath(portalNew : New){
    return this.clientService.getImagePath(portalNew);
  }

}
