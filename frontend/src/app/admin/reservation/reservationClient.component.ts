import { Component, OnInit } from '@angular/core';
import {HomeService} from "../../services/home.service";

@Component({
  selector: 'app-reservationClient',
  templateUrl: './reservationClient.component.html',
  styleUrls: ['./reservationClient.component.scss']
})
export class ReservationClientComponent implements OnInit {

  allReseravation: any[] = [];

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {

    this.getReservation();
  }


  getReservation() {
    this.homeService.getAllReservation().subscribe(
      (reser) => {
        this.allReseravation.push(reser);
        console.log('reservation =>', this.allReseravation);
      }
    )

  }



}
