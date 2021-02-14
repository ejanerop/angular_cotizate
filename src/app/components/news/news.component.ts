import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private clientService : ClientsService) { }

  ngOnInit(): void {
  }

  isAuth(){
    return this.clientService.isAuth();
  }

}
