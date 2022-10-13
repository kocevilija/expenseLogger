import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActionService } from 'src/app/services/action/action.service';
import { DatetimeService } from 'src/app/services/datetime/datetime.service';
import { Expense } from 'src/app/interfaces/expense';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {

  expenseForm: Expense;

  addExpenseForm = new FormGroup({
		amount: new FormControl<number>(0, Validators.required),
		description: new FormControl(''),
		type: new FormControl('', Validators.required),
	});

  constructor(
    private modalController: ModalController,
    private actionService: ActionService,
    private dateTimeService: DatetimeService) { 
    }

  ngOnInit() {
  }

  initCreateExpense(): void
  {

    this.expenseForm = 
    {
      amount: Number(this.addExpenseForm.value.amount.toFixed(2)),
      description: this.addExpenseForm.value.description,
      type: this.addExpenseForm.value.type,
      createdOn: this.dateTimeService.getCurrentDate()
    };
    this.actionService.createExpense(this.expenseForm).then(() => 
    {
      console.log("Expense created:");
      this.dismissModal();
    }).catch(err => console.log(err));
  }

  dismissModal()
  {
    this.modalController.dismiss();
  }
}
