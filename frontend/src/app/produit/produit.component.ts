import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HomeService} from "../services/home.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {render} from "creditcardpayments/creditCardPayments";

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit {

  salonList: any[] = [];
  reserveForm: FormGroup;
  errorMsg: string = " ";
  startedDate ;
  currentHours ;
  salonId: number
  clientId: number;
  duree: number;
  price: number;
  reserved: boolean = false;
  currentDate: any;
  debut: any;
  fin: any;
  listDate: any;
  listHeureDebut: any;
  listHeureFin: any;

  dateDebut: any;
  heureDebut: any;
  heureFin: any;
  client: any;
  salon: any;


  constructor( private activatedRoute: ActivatedRoute,
               private router: Router,
               private homeService: HomeService,
               private fb: FormBuilder,
               private http: HttpClient
  ) {
    render({
      id: "#payments",
      currency: 'EUR',
      value: '60.00',
      onApprove: (details) => {
        alert('Transaction successfull');
      }
    });
  }

  ngOnInit(): void {

    const email = JSON.parse(localStorage.getItem('id_token')).email;
    this.getClientEmail(email);
    const id = + this.activatedRoute.snapshot.paramMap.get('id');
    // console.log('salon Id => ', id);

    this.activatedRoute.paramMap.subscribe(async paramMap => {
      if (!paramMap.has('id')) {
        await this.router.navigate(['/offres']);
      }
      this.salonId = + paramMap.get('id');
      this.getSalonById(this.salonId);
      this.getSalonPrice(this.salonId);
      // this.getSalonId(this.salonId);
    });

    this.startedDate = new Date().toISOString().slice(0,10);
    //this.endDate = new Date().toISOString().slice(0,10);
    // console.log(this.startedDate)

    this.currentHours = new Date().toLocaleTimeString();
    // console.log('current hours =>', this.currentHours);
    this.currentDate = new Date();
    console.log('current date =>', this.currentDate);


    this.reserveForm = this.fb.group({
        dateDebut: ['', [Validators.required]],
        heureDebut: ['', Validators.required],
        heureFin: ['', Validators.required]
    });

  }

  hasAuthToken() {
    return localStorage.getItem('id_token') !== null;
  }

  addReservation(dateDebut: Date, client: any,  heureDebut: any, heureFin: any, salon: any, duree: number) {
  const reservation = {dateDebut, client, heureDebut, heureFin,  salon, duree};
    console.log('Reservation => ', reservation);

    this.http.post('https://localhost:8000/api/reservations', reservation).subscribe(response => {
      console.log('Response => ', response);
    });
  }

  getClientEmail(email) {
    this.homeService.getClientByEmail(email).subscribe(
      (emailClient) => {
        this.clientId = + emailClient[0].id;
        // console.log('client by id', this.clientId);
      }
    )
  }

  calculDifferenceHeure() {
    const heureDebut = (<HTMLInputElement>document.getElementById('heureDebut')).value;
    const heureFin = (<HTMLInputElement>document.getElementById('heureFin')).value;

     this.debut = heureDebut.split(':');
     this.fin = heureFin.split(':');

    // @ts-ignore
    if(parseInt(this.fin) > parseInt(this.debut)) {
      // @ts-ignore
      this.duree = parseInt(this.fin) - parseInt(this.debut);
    } else {
      this.errorMsg = "L'heure de fin doit être supérieure à l'heure de debut";
    }

    console.log('duree => ', this.duree);

  }

  onSubmit() {
    if(this.reserveForm.invalid) {
      return ;
    }
    //this.reserved = true;

    this.dateDebut = this.reserveForm.get('dateDebut').value;
    this.heureDebut = this.reserveForm.get('heureDebut').value;
    this.heureFin = this.reserveForm.get('heureFin').value;

    this.salon = 'api/salons/' + this.salonId ;

    this.client = 'api/clients/' + this.clientId;


    //console.log('dateDebut => ', this.dateDebut);
    //console.log('heureDebut => ', this.heureDebut);
    //console.log('heureFin => ', this.heureFin);
    //console.log('salonId => ', this.salon);
    //console.log('clientId => ', this.client);
    //console.log('duree => ', this.duree);


    //console.log('---------------------------------------------------------');
    //console.log('formValue =>', this.reserveForm.value);

    //this.getSalonId(this.salonId);

    this.addReservation(this.dateDebut, this.client, this.heureDebut, this.heureFin, this.salon, this.duree);

    this.reserveForm.reset();
    // this.router.navigate(['/reservation']);
  }

  getSalonId(id) {
    this.homeService.getSingleSalon(id).subscribe(
      (salon) => {
        // console.log('salonnnnnnnnnnnnnnnnnn =>', salon['reservation']);
        const myDate = salon['reservation'].filter(el => salon['reservation'] !== el.dateDebut);
        // console.log('myDate =>', myDate);
        myDate.forEach((el, index, arr) => {
          this.listDate = el.dateDebut;
          this.listHeureDebut = el.heureDebut;
          this.listHeureFin = el.heureFin;
         // console.log('element dateDebut =>', el.dateDebut);
          // console.log('element heuredebut =>', el.heureDebut);
          // console.log('element heureFin =>', el.heureFin);
          // console.log('index =>', index);
          //console.log('array =>', arr);
        })
        if(this.dateDebut >= this.listDate && this.heureDebut >= this.listHeureDebut && this.heureFin <= this.listHeureDebut) {
          console.log('nonnnn');
        } else {
          console.log('ouiii');
          //this.addReservation(this.dateDebut, this.client, this.heureDebut, this.heureFin, this.salon, this.duree);
        }
        /*
        if(this.dateDebut === this.listDate) {
          if(this.heureDebut === this.listHeureDebut || this.heureDebut === this.listHeureFin || this.heureFin === this.listHeureDebut
            || this.heureFin === this.listHeureFin) {
            console.log('pas autoriser');
          } else {
            console.log('autoriser');
            //this.addReservation(this.dateDebut, this.client, this.heureDebut, this.heureFin, this.salon, this.duree);
          }
        }
         */
       // console.log('mydate =>', myDate);

       // console.log('okkkkkkkkkkkkkkkkkk')

      }
    );
  }

  getSalonById(id) {
    this.homeService.getSingleSalon(id).subscribe(
      (salon) => {
       // console.log('salonnnnnnnnnnnnnnnnnn =>', salon['reservation'][0].heureDebut);
        this.salonList.push(salon);
         console.log('Salon list =>',this.salonList);
      }
    );
  }

  getSalonPrice(id) {
    this.homeService.getSingleSalon(id).subscribe(
      (salon) => {
        this.price = salon['prix'];
        // console.log('Salon prix =>', salon['prix']);
      }
    )
  }

}
