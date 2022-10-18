import { Component } from '@angular/core';
import { StorageKeys } from './constants/constants';
import { DataService } from './services/data/data.service';
import { DatetimeService } from './services/datetime/datetime.service';
import { StorageService } from './services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private dataService: DataService,
    private storageService: StorageService,
    private datetimeService: DatetimeService) {
    this.initializeDate();
  }

  initializeDate() {
    this.storageService.getFromLocalStorage(StorageKeys.INSTALL_DATE).then(val => {
      if(val)
      {
        this.datetimeService.installDate = val;
      }
      else
      {
        this.storageService.saveToLocalStorage(StorageKeys.INSTALL_DATE, this.datetimeService.getCurrentDate());
      }

      this.datetimeService.todayDate = this.datetimeService.getCurrentDate();
    });
  }
}


