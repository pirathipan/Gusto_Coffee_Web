import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxCaptchaModule} from "ngx-captcha";
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SigninComponent } from './authentification/signin/signin.component';
import { SignupComponent } from './authentification/signup/signup.component';
import { OffresComponent } from './offres/offres.component';
import { ProduitComponent } from './produit/produit.component';
import { ContactComponent } from './contact/contact.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminPropertiesComponent } from './admin/admin-properties/admin-properties.component';

import { AuthentificationServiceService } from "./authentification/authentification-service.service";
import {AuthHttp} from "angular2-jwt";
import { SalonComponent } from './admin/salon/salon.component';

import { ReservationClientComponent } from './admin/reservation/reservationClient.component';
import { AllSalonComponent } from './admin/all-salon/all-salon.component';
import { MentionsComponent } from './mentions/mentions.component';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    SigninComponent,
    SignupComponent,
    OffresComponent,
    ProduitComponent,
    ContactComponent,
    AdminDashboardComponent,
    AdminPropertiesComponent,
    SalonComponent,
    ReservationClientComponent,
    AllSalonComponent,
    MentionsComponent,



  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    AppRoutingModule,
    FormsModule,

  ],
  providers: [
    {
      provide: AuthHttp,
    },
    AuthentificationServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
