import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

  public forgotPassowrdForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })
  constructor() { }

  ngOnInit() {}


  submitTapped() {
    
  }

}
