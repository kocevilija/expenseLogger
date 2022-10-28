import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })
  constructor(private fireAuth: AngularFireAuth) {
   }

  ngOnInit() {
    console.log(this.fireAuth.currentUser)
  }

  //TODO: Implement on login tapped 
  loginTapped() {
    var values = this.loginForm.value;
    console.log('Usr: ' + values.email + ' Pass: ' + values.password);
    this.fireAuth.signInWithEmailAndPassword(
      values.email,
      values.password)
      .then(res => 
        {
          console.log(res);
        })
      .catch(err => 
        {
          console.log(err);
        });
    }
}
