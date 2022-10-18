import { Injectable } from '@angular/core';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class DatetimeService {

  private _todayDate: Date;
  private _installDate: Date;
  private _selectedDate: Date;

  constructor() { }
  

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

  get todayDate(): Date
  {
    return this._todayDate;
  }

  set todayDate(date: Date)
  {
    this._todayDate = date;
  }

  get selectedDate(): Date
  {
    return this._selectedDate;
  }

  set selectedDate(date: Date)
  {
    this._selectedDate = date;
  }
}
