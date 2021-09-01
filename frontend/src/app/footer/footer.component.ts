import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";




@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {
  navbarOpen = false;
  navbarOpen1 = false;
  navbarOpen2 = false;
  subcriberForm: FormGroup;


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.subcriberForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]]
    })

  }


  toggleNavbar() {

    this.navbarOpen = !this.navbarOpen;
  }

  toggleNavbar1() {
    this.navbarOpen1 = !this.navbarOpen1;
  }
  toggleNavbar2() {
    this.navbarOpen2 = !this.navbarOpen2 ;
  }


  onSubmit() {
    alert('Envoyer avec succès');
    this.subcriberForm.reset();
  }
}
