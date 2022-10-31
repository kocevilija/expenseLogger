import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public showPassword: boolean = false;

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })
  constructor(
    private authService: AuthService) {
   }

  ngOnInit() {
  }

  //doLogin
  loginTapped() {
    var values = this.loginForm.value;
    this.authService.loginWithWmailAndPass(values.email, values.password)
      .subscribe({
        next: res => 
        {
          console.log(res);
        },
        error: err =>
        {

        }
      });
    }

    togglePassword()
    {
      this.showPassword = !this.showPassword;
    }
}
