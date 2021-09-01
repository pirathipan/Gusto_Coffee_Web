import { Component, OnInit } from '@angular/core';
import {HomeService} from "../../services/home.service";

@Component({
  selector: 'app-all-salon',
  templateUrl: './all-salon.component.html',
  styleUrls: ['./all-salon.component.scss']
})
export class AllSalonComponent implements OnInit {
  loadSalon: any[] = [];

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.getSalon()
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
