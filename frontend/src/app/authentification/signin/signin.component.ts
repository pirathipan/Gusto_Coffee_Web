import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthentificationServiceService } from "../authentification-service.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  error = '';
  showErrorMessage: boolean;

  constructor(private authenticationService: AuthentificationServiceService,
    private router: Router,
    private fb: FormBuilder
  ) {
   }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.getCurrentUserData();

  }


  logout() {
    this.authenticationService.logout();
    this.router.navigate(['accueil']);
  }

  createCompte(){
    this.router.navigate(['inscription']);
  }

  login() {
    this.showErrorMessage = false;
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    this.authenticationService.authenticate(email, password).subscribe(
      (data) => {
        localStorage.setItem('id_token', JSON.stringify({email: email, token: data.token}));
        this.router.navigate(['accueil']);

      },
      (error) => {
        this.error = error.message
        this.showErrorMessage = true;
      }

    );
  }

  getCurrentUserData() {
    // console.log('Current User', JSON.parse(localStorage.getItem('id_token')).email);
    return JSON.parse(localStorage.getItem('id_token')).email || null;
  }




}
