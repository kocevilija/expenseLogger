import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  public registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  constructor(private authService: AuthService) {

   }

  ngOnInit() {

  }

  //doRegister
  submitTapped() {
    var values = this.registerForm.value;
    this.authService.registerWithEmailAndPass(values.email, values.password)
    .subscribe({
      next: res => 
      {
        console.log(res);
      },
      error: err =>
      {
        console.log(err);
      }
    })
  }
}
