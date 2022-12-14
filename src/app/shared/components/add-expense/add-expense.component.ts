import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActionService } from 'src/app/services/action/action.service';
import { DatetimeService } from 'src/app/services/datetime/datetime.service';
import { Expense } from 'src/app/interfaces/expense';
import { ExpenseTypes } from 'src/app/constants/constants';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {

  expenseForm: Expense;
  expenseTypes: any;

  addExpenseForm = new FormGroup({
		amount: new FormControl<number>(0, Validators.required),
		description: new FormControl(''),
		type: new FormControl('', Validators.required),
	});

  constructor(
    private modalController: ModalController,
    private actionService: ActionService,
    private dateTimeService: DatetimeService) { 
      this.expenseTypes = ExpenseTypes;
    }

  ngOnInit() {
  }

  initCreateExpense(): void
  {
    this.dateTimeService.getSelectedDate().then(val => 
      {
        this.expenseForm = 
        {
          amount: Number(this.addExpenseForm.value.amount.toFixed(2)),
          description: this.addExpenseForm.value.description,
          type: this.addExpenseForm.value.type,
          createdOn: val 
        };

        if(!this.expenseForm.createdOn)
        {
          this.expenseForm.createdOn = this.dateTimeService.getCurrentDate(); 
        }

        this.actionService.createExpense(this.expenseForm).then(() => 
        {
          console.log("Expense created:");
          this.dismissModal();
        }).catch(err => console.log(err));
      });
  }

  dismissModal()
  {
    this.modalController.dismiss();
  }
}
