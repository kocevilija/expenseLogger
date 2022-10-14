import { Injectable } from '@angular/core';
import { Expense } from 'src/app/interfaces/expense';
import { DataService } from '../data/data.service';
import { DatetimeService } from '../datetime/datetime.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(
    private dataService: DataService,
    private storageService: StorageService,
    private dateTimeService: DatetimeService) {

   }

   async createExpense(expense: Expense): Promise<void>
   {
    let key = this.dateTimeService.getDateTimeISO(expense.createdOn);
    this.storageService.saveExpenseToLocal(expense);
    return this.dataService.setExpense(expense);
   }

   async getTodaysExpansesFromLocal(): Promise<Expense[]> {
    return await this.storageService.getExpensesFromLocal().then((expenses: Expense[]) => 
    {
      return expenses;
    });
   }
}
