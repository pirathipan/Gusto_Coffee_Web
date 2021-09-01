import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IClient} from "../../interfaces/iclient";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HomeService} from "../../services/home.service";
import {Router} from "@angular/router";



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

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  submited = false;
  siteKey: string = "6LdHoiccAAAAAMZ6Yo_M3IHMNXBp1boAZ_y6oLf2";

  // private api_url = 'https://localhost:8000/api/';
  clients: IClient[] = [] ;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private  homeService: HomeService,
              private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
        firstName : ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['',[ Validators.required, Validators.minLength(8)]],
        password1: ['', Validators.required],
        telephone: ['', [ Validators.required, Validators.pattern('^(\\+?\d{1,4}[\s-])?(?!0+\s+,?$)\\d{10}\s*,?$')]],
        recaptcha: ['', Validators.required]
      },
      {
        validators: this.MustMatch('password', 'password1')
      })
  }




  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  get form() {
    return this.signupForm.controls;
  }

  addClient(email: string, roles: [], password: string, nomClient: string, prenomClient: string, telephone: string) {
    const client: IClient = {email, roles: ['ROLE_USER'], password, nomClient, prenomClient,  telephone }
    console.log('Clienttttttttt', client);
    this.http.post('https://localhost:8000/api/clients', client).subscribe(response => {
      this.clients.push(client);
      // console.log('Response', response)
    });
    // console.log('okkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
  }

  onSubmit() {
    this.submited = true;

    if (this.signupForm.invalid) {
      return;

    }

    const nomClient = this.signupForm.get('firstName').value;
    const prenomClient = this.signupForm.get('lastName').value;
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    const telephone = this.signupForm.get('telephone').value;
    const roles = [];

    this.addClient(email, roles['ROLE_USER'], password, nomClient, prenomClient, telephone);
    this.router.navigate(['/login']);
  }
}
