import { Injectable } from '@angular/core';
import * as moment from "moment";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatetimeService {

  private _installDate: Date;
  private _selectedDate: BehaviorSubject<Date>;

  constructor() { 
    this._selectedDate = new BehaviorSubject<Date>(this.getCurrentDate());
  }

  getSelectedDateSubscriptin(): BehaviorSubject<Date>
  {
    return this._selectedDate;
  }

  async getSelectedDate(): Promise<Date>
  {
    return this._selectedDate.getValue();
  }
  
  async setSelectedDate(date: Date | string): Promise<void>
  {
    if(typeof date === "string")
    {
      this._selectedDate.next(this.createDateFromString(date));
    }
    else
    {
      this._selectedDate.next(date);
    }
  }

  createDateFromString(date: string): Date
  {
    return moment(date).toDate();
  }

  getCurrentDate(): Date
  {
    return moment().toDate();
  }

  getDateTimeISO(date?: Date): string{
    return date ? moment(date).format('L'): moment().format('L');
  }

  get installDate(): Date
  {
    return this._installDate;
  }

  set installDate(date: Date)
  {
    this._installDate = date;
  }
}
