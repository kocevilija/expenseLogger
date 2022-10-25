import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActionSheetController, IonDatetime, ModalController } from '@ionic/angular';
import { BehaviorSubject, SubscriptionLike } from 'rxjs';
import { ExpenseTypes } from 'src/app/constants/constants';
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
  expenseTypes: any;
  totalSubscription: SubscriptionLike;
  todaysTotal: number;

  filterByPrice: boolean;
  filterByPriceUp: boolean;


  constructor(  
    private modalController: ModalController,
    private dataService: DataService,
    private actionService: ActionService,
    private datetimeService: DatetimeService,
    private actionSheetCtrl: ActionSheetController) {

      this.installDate = this.datetimeService.installDate;
      this.expenseTypes = ExpenseTypes;
      this.todaysTotal = null;

    }
  ngOnDestroy(): void 
  {
    
  }

  ngOnInit() 
  {
    this.totalSubscription = this.dataService.getTodayTotalExpenseSub().subscribe(
      {
        next: (total: number) => {
          this.todaysTotal = total;
        },
        error: (err) => {},
        complete: () => {},
      }
    );
    this.expenseTypes = ExpenseTypes;
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

  priceFilter()
  {
    this.expenses = this.expenses.sort((x, y) => 
    {
      if(x.amount > y.amount) return this.filterByPriceUp ? 1 : -1;
      if(y.amount > x.amount) return this.filterByPriceUp ? -1 : 1;
      return 0;
    });

    this.filterByPrice = true;
    this.filterByPriceUp = !this.filterByPriceUp;
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Filter by',
      buttons: [
        {
          text: 'Price',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Recent',
          data: {
            action: 'share',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
  }

}
 