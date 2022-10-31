import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { isNull } from 'lodash';
import { from, Observable, throwError } from 'rxjs';
import { LodashService } from '../lodash/lodash.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireAuth: AngularFireAuth,
    private _: LodashService) 
  {

  }

  //TODO: loginWithEmailAndPass
  loginWithWmailAndPass(email: string, password: string): Observable<firebase.default.auth.UserCredential | void>
  {
    if(isNull(email), isNull(password)){
      return throwError("Email and/or password cannot be null");
    }

    return from(this.fireAuth.signInWithEmailAndPassword(email, password));
  }

  //TODO: registerWithEmailAndPass
  registerWithEmailAndPass(email: string, password: string): Observable<firebase.default.auth.UserCredential>
  {
    if(isNull(email), isNull(password)){
      throwError("Email and/or password cannot be null");
    }

    return from(this.fireAuth.createUserWithEmailAndPassword(email, password));
  }

  //TODO: logout

  logout(): Observable<void>
  {
    return from(this.fireAuth.signOut());
  }

  //TODO: loginWithGoogle
}
