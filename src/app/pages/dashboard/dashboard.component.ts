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
  installDate: Date;
  selectedDate: Date;
  todayDate: Date;
  dateSubscription: SubscriptionLike;


  constructor(  
    private modalController: ModalController,
    private dataService: DataService,
    private actionService: ActionService,
    private datetimeService: DatetimeService) {

      this.actionService.getTodaysExpansesFromLocal().then(val => this.expenses = val);
      this.installDate = this.datetimeService.installDate;
    }
  ngOnDestroy(): void 
  {
    
  }

  ngOnInit() 
  {
    this.todayDate = this.datetimeService.getCurrentDate();
    this.dateSubscription = this.datetimeService.getSelectedDateSubscriptin().subscribe(
      {
        next: (date: Date) => {
          this.selectedDate = date;
        },
        error: (err) => {},
        complete: () => {},
      }
    )
    this.subscription =
    this.dataService.getExpenseSubscription().subscribe({
      next: (expense) => {
        if(expense != null)
        {
          this.expenses = expense;
        }
        else
          this.expenses = [];
        console.log("exp: " + expense);
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
    this.selectedDate = this.datetimeService.createDateFromString(date);
    this.datetimeService.setSelectedDate(date).then(() => 
    {
      this.actionService.emitExpensesByDateFromLocal(this.selectedDate);
    });
  }

  setCurrentToTodayDate()
  {
    this.datetimeService.setSelectedDate(this.datetimeService.getCurrentDate()).then(() => 
    {
      this.actionService.emitExpensesByDateFromLocal(this.selectedDate);
    });
  }

}
