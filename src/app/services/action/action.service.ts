import { Injectable } from '@angular/core';
import { Expense } from 'src/app/interfaces/expense';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private dataService: DataService) {
    
   }

   async createExpense(expense: Expense): Promise<void>
   {
    return this.dataService.setExpense(expense);
   }
}
