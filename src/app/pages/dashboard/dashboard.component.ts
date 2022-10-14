import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, SubscriptionLike } from 'rxjs';
import { Expense } from 'src/app/interfaces/expense';
import { ActionService } from 'src/app/services/action/action.service';
import { DataService } from 'src/app/services/data/data.service';
import { AddExpenseComponent } from 'src/app/shared/components/add-expense/add-expense.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {

  expenses: Expense[];
  subscription: SubscriptionLike;
  constructor(
    private modalController: ModalController,
    private dataService: DataService,
    private actionService: ActionService) { 
      this.expenses = [];
      this.actionService.getTodaysExpansesFromLocal().then(val => this.expenses = val);
    }
  ngOnDestroy(): void {
    
  }

  ngOnInit() {

    this.subscription =
    this.dataService.getExpenseSubscription().subscribe({
      next: (value) => {
        console.log(value);
        if(value != null)
          this.expenses.push(value);
      },
      error: (err) => {
        
      },
      complete: () => {
        
      },
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddExpenseComponent
    });
    
    return await modal.present();
  }

}
