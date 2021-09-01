import { Component, OnInit } from '@angular/core';
import {HomeService} from "../services/home.service";

@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.scss']
})
export class OffresComponent implements OnInit {
  loadSalon: any[] = [];
  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.getSalon();
  }

  getSalon(){
    this.homeService.getAllSalons().subscribe(
      (salon) => {
        this.loadSalon.push(salon);
        // console.log('salon =>', salon);
      }
    )
  }
}
