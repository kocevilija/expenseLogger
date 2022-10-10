import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivityComponent } from './activity.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ActivityComponent],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([
      {path: "", component: ActivityComponent}
    ])
  ]
})
export class ActivityModule { }
