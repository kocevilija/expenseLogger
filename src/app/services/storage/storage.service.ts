import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Expense } from 'src/app/interfaces/expense';
import { DataService } from '../data/data.service';
import { DatetimeService } from '../datetime/datetime.service';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private datetimeService: DatetimeService,
    private dataService: DataService) { }

  async saveExpenseToLocal(expense: Expense): Promise<void>
  {
    const key = this.datetimeService.getDateTimeISO(expense.createdOn);
    let expenseList: Expense[] = [];
    return this.getFromLocalStorage(key)
    .then((expenses: Expense[]) => {
      if(expenses == null){
        expenseList.push(expense);
      }
      else{
        expenseList = expenses;
        expenseList.push(expense);
      }

    }).then(() => {
      this.saveToLocalStorage(key, expenseList).then(() => 
      {
        this.dataService.setExpenses(expenseList);
      })
    })
    .catch(err => console.log(err));

  }

  async getExpensesFromLocal(date?: Date): Promise<Expense[]>
  {
    let key = date ? this.datetimeService.getDateTimeISO(date) :
    this.datetimeService.getDateTimeISO();

    return await this.getFromLocalStorage(key).then((expenses: Expense[]) => 
    {
      return expenses;
    });
  }

  async saveToLocalStorage(key: string, value: any) {
    return await Preferences.set({
      key: key,
      value: JSON.stringify(value)
    });
  }

  async getFromLocalStorage(key: string): Promise<any> {
    const ret = await Preferences.get({key});
    return JSON.parse(ret.value);
  }
  
  async removeFromLocalStorage(key: string): Promise<void>
  {
    return await Preferences.remove({key});
  }

  async clearLocalStorage(): Promise<void>
  {
    await Preferences.clear();
  }

}