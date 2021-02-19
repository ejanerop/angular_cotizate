import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-news',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private clientService : ClientsService) { }

  ngOnInit(): void {
  }

  isAuth(){
    return this.clientService.isAuth();
  }

}
