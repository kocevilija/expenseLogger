import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { IonicModule } from '@ionic/angular';
import { AppFormsModule } from 'src/app/core/modules/app-forms/app-forms.module';


@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    IonicModule,
    AppFormsModule
  ]
})
export class ForgotPasswordModule { }
