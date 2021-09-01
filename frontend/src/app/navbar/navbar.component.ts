import {Component, OnInit} from '@angular/core';
import {AuthentificationServiceService} from "../authentification/authentification-service.service";
import {Router} from "@angular/router";
import {HomeService} from "../services/home.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {



  constructor(private authenticateService: AuthentificationServiceService, private router: Router, private homeService: HomeService) {

  }
  navbarOpen = false;
  openDropdown = false;
  clients: any[] = [];
  rolesAdmin: boolean = false;
  clientId: number;
  email: string;
  roles: any;
  ngOnInit(): void {
    this.email = JSON.parse(localStorage.getItem('id_token')).email;
    this.getClient(this.email);
  }

  getClient(email) {
    this.homeService.getClientByEmail(email).subscribe(
      (emailClient) => {
        this.clients.push(emailClient);
        console.log('email client => ', this.clients);
        this.clientId = +emailClient[0].id;
        for (let client of this.clients[0]) {
          this.roles = client.roles;
          console.log(this.roles)
          if (this.roles.length == 2) {
            this.rolesAdmin = true
            console.log("true");
          }
          if (localStorage.getItem('id_token') == null || this.roles.length == 1) {
            this.rolesAdmin = false
            console.log("false");
          }

        }
      })
  }


  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  toggleDropdown() {
    this.openDropdown = !this.openDropdown;
  }

  hasAuthToken() {
    return localStorage.getItem('id_token') !== null;
  }

  onLogout() {
    this.authenticateService.logout();
    this.router.navigate(['accueil']);

  }


}
