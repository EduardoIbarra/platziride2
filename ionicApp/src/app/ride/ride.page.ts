import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Ride} from '../models/ride';
import {RideService} from '../services/ride';
import {HelpersService} from '../services/helpers';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.page.html',
  styleUrls: ['./ride.page.scss'],
})
export class RidePage implements OnInit {
  id: string = null;
  ride: Ride = null;
  constructor(
      private activatedRoute: ActivatedRoute,
      private rideService: RideService,
      private helpersService: HelpersService,
      private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.rideService.getById(this.id).subscribe((result: Ride) => {
      this.ride = result;
    });
  }
  delete(id) {
    this.rideService.remove(id).subscribe(() => {
      this.helpersService.presentAlert({
        header: 'Atención',
        subHeader: 'Eliminado',
        message: 'Registro eliminado con éxito',
        buttons: ['OK']
      });
    }, (error) => {
      console.log(error);
      this.navCtrl.pop();
    });
  }
}
