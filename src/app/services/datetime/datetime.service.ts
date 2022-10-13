import { Injectable } from '@angular/core';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class DatetimeService {

  constructor() { }

  getCurrentDate(): Date
  {
    return moment().toDate();
  }
}
