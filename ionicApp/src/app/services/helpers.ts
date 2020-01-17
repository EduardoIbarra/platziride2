import {Injectable} from '@angular/core';
import {AlertController} from '@ionic/angular';

@Injectable()
export class HelpersService {
    constructor(
        private alertController: AlertController,
    ) {}
    public async presentAlert(config) {
        const alert = await this.alertController.create(config);
        await alert.present();
    }
}
