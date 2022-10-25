import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Expense } from 'src/app/interfaces/expense';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly _expenses: BehaviorSubject<Expense[]>;
  private readonly _todayTotalExpense: BehaviorSubject<number>;

  constructor() {
    this._expenses = new BehaviorSubject<Expense[]>(null);
    this._todayTotalExpense = new BehaviorSubject<number>(0);
  }

  getTodayTotalExpenseSub(): BehaviorSubject<number>
  {
    return this._todayTotalExpense;
  }

  async setTodayTotalExpense(total: number)
  {
    this._todayTotalExpense.next(total);
  }

  async getExpenses(): Promise<Expense[]>
  {
    return this._expenses.getValue();
  }

  async setExpenses(expenses: Expense[]): Promise<void>
  {
    if(expenses)
    {
      this.setTodayTotalExpense(this.calculateCurrentTotal(expenses));
    }
    return this._expenses.next(expenses);
  }

  getExpenseSubscription(): BehaviorSubject<Expense[]>
  {
    return this._expenses;
  }

  calculateCurrentTotal(expenses: Expense[]): number
   {
    let total = 0;

    for(let expense of expenses)
    {
      total += expense.amount;
    }

    return total;
   }
}
