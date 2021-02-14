import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ClientsService } from '../services/clients.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private service: ClientsService,
    private router: Router) {}

  canActivate(): boolean {
    if (this.service.isAuth()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
