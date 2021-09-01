import { Component, OnInit } from '@angular/core';
import { HomeService } from "../services/home.service";
import { FormBuilder } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;application/json',
    'Access-Control-Allow-Credentials': 'true',
    'Authorization': 'my-auth-token',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  })
};


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loadSalon: any[] = [];

  constructor(private homeService: HomeService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSalon();
  }


  getSalon() {
    this.homeService.getAllSalons().subscribe(
      (salon) => {
        this.loadSalon.push(salon);
        //console.log('salon =>', salon);

      }
    )

  }

  navigateByUrl(salon) {
    const link = ['/offres', salon.id];
    this.router.navigate(link);
  }


}
