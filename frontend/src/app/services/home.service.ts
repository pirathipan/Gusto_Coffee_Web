import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ISalon} from "../interfaces/isalon";
import {IReservation} from "../interfaces/ireservation";
import {IClient} from "../interfaces/iclient";
import {Observable} from "rxjs";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Credentials' : 'true',
    'Authorization': 'my-auth-token',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  })
};

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private api_url = 'https://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  // Get all
  getAllSalons() {
      return this.http.get<ISalon>(this.api_url + 'salons');
  }

  getAllReservation() {
    return this.http.get<IReservation>(this.api_url + 'reservations');
  }

  getAllClient() {
    return this.http.get<IClient>(this.api_url + 'clients');
  }

  getAllMediaObject() {
    return this.http.get(this.api_url + 'media_objects');
  }
  // end get all

  // get single
  getSingleSalon(id: number) {
    return this.http.get(this.api_url + 'salons/' + id);
  }

  getSingleReservation(id: number) {
    return this.http.get(this.api_url + 'reservations/' + id);
  }

  getClientById(id: string) {
    return this.http.get(this.api_url + 'clients/' + id);
  }

  getClientByEmail(email: string) {
    return this.http.get(this.api_url + 'clients?email=' + email);
  }


  getSingleImage(id: number) {
    return this.http.get(this.api_url + 'media_objects/' + id);
  }

  getReservationByClient(clientId: number) {
    return this.http.get(this.api_url + 'reservations?client=' + clientId);
  }

  uploadFile(file):Observable<any> {
    const formData = new FormData();

    formData.append('file', file, file.name);

    return this.http.post(this.api_url + 'media_objects', formData);
  }





}
