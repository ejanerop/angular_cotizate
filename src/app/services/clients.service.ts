import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Client } from '../models/client.model';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private _url : string = 'http://localhost:8001/api';
  api_token : string | null = '';
  username : string = '';


  constructor( private http : HttpClient) {
    this.loadToken();
  }

  getQuery( query : string ){

    const endpoint = `${this._url}/${ query }`;

   return this.http.get(endpoint);

  }

  getClients(){

    return this.getQuery('clients');

  }

  getClient(id : string){

    return this.getQuery(`clients/${ id }`);

  }

  addPayments(users : Client[]){

    const url = `${this._url}/payments`;

    const data = {
      'api_token' : this.api_token,
      'users' : users
    }
    return this.http.post(url, data, {observe: 'response'});


  }

  editUser(user : Client){

    const url = `${this._url}/client`;

    const data = {
      'api_token' : this.api_token,
      'user' : user
    }

    return this.http.post(url, data,  {observe: 'response'});


  }

  login(data : any){

    const url = `${this._url}/login`;
    return this.http.post(url, data, {observe: 'response'}).pipe(
      map( (resp : any) => {
        this.saveToken(resp.body.data.api_token);
        return resp;
      })
    );

  }


  logout(){

    const url = `${this._url}/logout`;
    const token = this.api_token;
    return this.http.post(url, {api_token : token}, {observe: 'response'}).pipe(
      map( (resp : any) => {
        console.log(token);
        this.removeToken();
        return resp;
      })
    );;

  }
  removeToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('expira');
  }

  private saveToken( idToken: string ) {

    this.api_token = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem('expira', hoy.getTime().toString() );


  }

  loadToken() {

    if ( localStorage.getItem('token') == null ) {
      this.api_token = '';
    } else {
      this.api_token = localStorage.getItem('token');
    }

    return this.api_token;

  }


  isAuth() {
    if ( this.api_token != null && this.api_token.length < 2  ) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if ( expiraDate > new Date() ) {
      return true;
    } else {
      return false;
    }


  }




}
