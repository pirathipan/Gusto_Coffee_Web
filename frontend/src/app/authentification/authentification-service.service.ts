import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { tokenNotExpired } from 'angular2-jwt';
import { map } from 'rxjs/operators';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Credentials' : 'true',
    'Authorization': 'coffee',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  })
};


@Injectable({
  providedIn: 'root'
})
export class AuthentificationServiceService{


  constructor(private http: HttpClient) { }

  authenticate(email: string, password: string)  {
    let data = {email, password};
    let url = 'https://localhost:8000/api/login';
    let body     = new URLSearchParams();
    body.append('email', data.email);
    body.append('password', data.password);

    return this.http.post(url, data).pipe(map((res: any) => {
      console.log('res', res);
      return res;
    }));

  }





  logout() {
    localStorage.removeItem('id_token');
  }

  login() {
    return tokenNotExpired();
  }




}
