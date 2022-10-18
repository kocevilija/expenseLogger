import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonDatetime, ModalController } from '@ionic/angular';
import { BehaviorSubject, SubscriptionLike } from 'rxjs';
import { Expense } from 'src/app/interfaces/expense';
import { ActionService } from 'src/app/services/action/action.service';
import { DataService } from 'src/app/services/data/data.service';
import { DatetimeService } from 'src/app/services/datetime/datetime.service';
import { AddExpenseComponent } from 'src/app/shared/components/add-expense/add-expense.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {

  expenses: Expense[];
  subscription: SubscriptionLike;
  todayDate: Date;
  installDate: Date;
  selectedDate: Date;


  constructor(  
    private modalController: ModalController,
    private dataService: DataService,
    private actionService: ActionService,
    private datetimeService: DatetimeService) {

      this.actionService.getTodaysExpansesFromLocal().then(val => this.expenses = val);
      this.todayDate = this.datetimeService.todayDate;
      this.installDate = this.datetimeService.installDate;
      this.selectedDate = this.datetimeService.selectedDate;
    }
  ngOnDestroy(): void {
    
  }

  ngOnInit() {

    this.selectedDate = this.datetimeService.getCurrentDate();
    this.subscription =
    this.dataService.getExpenseSubscription().subscribe({
      next: (expense) => {
        if(!this.expenses)
        {
          this.expenses = [];
        }
        if(expense != null)
        {
          this.expenses.push(expense);
        }
        
      },
      error: (err) => {},
      complete: () => {},
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddExpenseComponent
    });
    
    return await modal.present();
  }

  changeSelectedDate(date: string)
  {
    this.datetimeService.selectedDate = this.datetimeService.createDateFromString(date);
    this.selectedDate = this.datetimeService.selectedDate;
  }

  setCurrentToTodayDate()
  {
    this.todayDate = this.datetimeService.getCurrentDate();
    this.selectedDate = this.datetimeService.getCurrentDate();
  }

}
