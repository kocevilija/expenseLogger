import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Expense } from 'src/app/interfaces/expense';
import { DatetimeService } from '../datetime/datetime.service';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private datetimeService: DatetimeService) { }

  async saveExpenseToLocal(expense: Expense): Promise<void>
  {
    const key = this.datetimeService.getDateTimeISO(expense.createdOn);
    let todaysExpenses: Expense[] = [];
    this.getFromLocalStorage(key)
    .then((expenses: Expense[]) => {
      if(expenses == null){
        todaysExpenses.push(expense);
      }
      else{
        todaysExpenses = expenses;
        todaysExpenses.push(expense);
      }

    }).then(() => {
      this.saveToLocalStorage(key, todaysExpenses)
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
    await Preferences.set({
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