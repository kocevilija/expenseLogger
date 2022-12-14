import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CatagoryPipe } from 'src/app/pipes/category.pipe';



@NgModule({
  declarations: [DashboardComponent, CatagoryPipe],
  imports: [
    IonicModule,
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      {path: "", component: DashboardComponent}
    ])
  ]
})
export class DashboardModule { }
