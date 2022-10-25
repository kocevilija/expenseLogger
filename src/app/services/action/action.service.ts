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
      this.getTodaysExpansesFromLocal();
   }

   async createExpense(expense: Expense): Promise<void>
   {
    return await this.storageService.saveExpenseToLocal(expense).then().catch();
   }

   async getTodaysExpansesFromLocal(): Promise<void> {
    return await this.storageService.getExpensesFromLocal().then((expenses: Expense[]) => 
    {
      this.dataService.setExpenses(expenses);
    });
   }

   async emitExpensesByDateFromLocal(date: Date): Promise<void>
   {
    return await this.storageService.getExpensesFromLocal(date).then(exp =>
      {
        this.dataService.setExpenses(exp);
      })
   }
}
