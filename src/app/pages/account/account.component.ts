import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AppRoutes, StorageKeys } from 'src/app/constants/constants';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {

  constructor(private storageService: StorageService,
    private alertController: AlertController,
    private fireAuth: AngularFireAuth,
    private router: Router) { }

  ngOnInit() {}

  resetAppData() {
    this.storageService.clearLocalStorage(true).then(() => {
      this.fireAuth.signOut();
      this.presentResetAlert();
      this.router.navigateByUrl(AppRoutes.LOGIN);
      
  });
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
