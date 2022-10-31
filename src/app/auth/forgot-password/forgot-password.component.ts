import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/constants/constants';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

  public forgotPassowrdForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })
  constructor(private fireAuth: AngularFireAuth,
    private router: Router) { }

  ngOnInit() {}


  submitTapped() {
    this.fireAuth.sendPasswordResetEmail(this.forgotPassowrdForm.value.email).then(res => 
      {
        this.router.navigateByUrl(AppRoutes.LOGIN);
      });
  }

}
