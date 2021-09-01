import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from "./home/home.component";
import {OffresComponent} from "./offres/offres.component";
import {ProduitComponent} from "./produit/produit.component";
import {SigninComponent} from "./authentification/signin/signin.component";
import {SignupComponent} from "./authentification/signup/signup.component";
import {AdminDashboardComponent} from "./admin/admin-dashboard/admin-dashboard.component";
import {ContactComponent} from "./contact/contact.component";
import {SalonComponent} from "./admin/salon/salon.component";

import { ReservationClientComponent } from "./admin/reservation/reservationClient.component"
import { AllSalonComponent } from './admin/all-salon/all-salon.component';
import {MentionsComponent} from "./mentions/mentions.component";



const routes: Routes = [
  {
    path: 'accueil',
    component: HomeComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: SigninComponent
  },
  {
    path: 'inscription',
    component: SignupComponent
  },
  {
    path: 'offres',
    component: OffresComponent
  },
  {
    path: 'offres/:id',
    component: ProduitComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'mentions',
    component: MentionsComponent
  },


  {
    path: 'admin/dashboard',
    children: [
      {
        path: 'salon',
        component: SalonComponent
      },
      {
        path: 'reservationAll',
        component: ReservationClientComponent
      },

      {
        path: 'salonAll',
        component: AllSalonComponent
      }
    ],
    component: AdminDashboardComponent
  },


];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
