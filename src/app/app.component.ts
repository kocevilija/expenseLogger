import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { AppRoutes, StorageKeys } from './constants/constants';
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
    private datetimeService: DatetimeService,
    private platform: Platform,
    private fireAuth: AngularFireAuth,
    private router: Router) {
      this.initializeApp();
      this.initializeDate();
  }

  async initializeApp(): Promise<void> {
    return await this.platform.ready().then(() => {
        this.fireAuth.onAuthStateChanged((user) => {
          if(user !== null)
          {
            this.storageService.saveToLocalStorage(StorageKeys.ACTIVE_USER, true);
            this.router.navigateByUrl(AppRoutes.TABS);

          }
          else
          {
            this.storageService.saveToLocalStorage(StorageKeys.ACTIVE_USER, false);
          }
        });
    });
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

    });
  }
}


