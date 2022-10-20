import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Expense } from 'src/app/interfaces/expense';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly _expenses: BehaviorSubject<Expense[]>;

  constructor() {
    this._expenses = new BehaviorSubject<Expense[]>(null);
  }

  async getExpenses(): Promise<Expense[]>
  {
    return this._expenses.getValue();
  }

  async setExpenses(expenses: Expense[]): Promise<void>
  {
    return this._expenses.next(expenses);
  }

  getExpenseSubscription(): BehaviorSubject<Expense[]>
  {
    return this._expenses;
  }
}
