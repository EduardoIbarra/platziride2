import { Component } from '@angular/core';
import {RideService} from '../services/ride';
import {NavController} from '@ionic/angular';
import {Credential, DEFAULT_CREDENTIAL_OBJECT} from '../models/credential';
import {AuthenticationService} from '../services/authentication';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  credential: Credential = DEFAULT_CREDENTIAL_OBJECT;
  constructor(
      private rideService: RideService,
      private navCtrl: NavController,
      private authenticationService: AuthenticationService,
  ) {}
  public login = () => {
    this.doLogin();
  };
  doLogin() {
    this.authenticationService.login({email: this.credential.email, password: this.credential.password}).subscribe((data: any) => {
      console.log(data);
      localStorage.setItem('jwt', data.token);
      this.navCtrl.navigateRoot('/rides');
    }, (error) => {
      console.log(error);
    });
  }
}
