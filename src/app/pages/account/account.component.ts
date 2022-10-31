import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {

  constructor(private storageService: StorageService,
    private alertController: AlertController) { }

  ngOnInit() {}

  resetAppData() {
    this.storageService.clearLocalStorage(true).then(() => 
    this.presentResetAlert());
  }

  async presentResetAlert() {
    const alert = await this.alertController.create({
      header: 'App data is reset!',
      buttons: ["OK"],
      id: "appResetAlert"
    });

    await alert.present();
  }

}
