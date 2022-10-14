import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Expense } from 'src/app/interfaces/expense';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly _expense: BehaviorSubject<Expense>;

  constructor() {
    this._expense = new BehaviorSubject<Expense>(
      {
        amount: 50, 
        description:"Demo expense", 
        type: "Demo type",
        createdOn: new Date()
   });
  }

  async getExpense(): Promise<Expense>
  {
    return this._expense.getValue();
  }

  async setExpense(expenses: Expense): Promise<void>
  {
    return this._expense.next(expenses);
  }

  getExpenseSubscription(): BehaviorSubject<Expense>
  {
    return this._expense;
  }
}
