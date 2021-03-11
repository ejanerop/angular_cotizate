import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Client } from '../models/client.model';
import { map } from "rxjs/operators";
import { New } from '../models/new.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private _url : string = 'http://10.24.122.2:8000/api';
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

  getNews(){

    return this.getQuery('news');

  }

  getNew(id : string){

    return this.getQuery(`news/${ id }`);

  }

  editNew(data : FormData){

    const url = `${this._url}/new`;

    if (this.api_token != null) {
      data.append('api_token', this.api_token);
    }

    return this.http.post(url, data, {observe: 'response'});
  }

  deleteNew(id: number) {

    const url = `${this._url}/new/${id}?api_token=${this.api_token}`;

    return this.http.delete(url,{observe : 'response'});


  }
  deleteClient(id: number) {

    const url = `${this._url}/client/${id}?api_token=${this.api_token}`;

    return this.http.delete(url,{observe : 'response'});

  }

  getClient(id : string){

    return this.getQuery(`clients/${ id }`);

  }
  getClientByIp(){

    return this.getQuery(`client_by_ip`);

  }

  getIp(){

    return this.getQuery(`ip`);

  }

  getImagePath(portalNew : New){

    const src = portalNew.src.split('\\');

    const folder = src[0];
    const file = src[1];

    return `${this._url}/storage/${folder}/${file}`;

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
    return this.http.post(url, data, {observe: 'response'}).pipe( map( (resp : any) => {
      this.saveToken(resp.body.data.api_token);
      return resp;
    })
    );

  }


  logout() {

    const url = `${this._url}/logout`;
    const token = this.api_token;
    return this.http.post(url, {api_token : token}, {observe: 'response'}).pipe( map( (resp : any) => {
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
