import { Component, OnInit } from '@angular/core';
import {RideService} from '../services/ride';
import {Ride} from '../models/ride';
import {Observable} from 'rxjs';
import {HelpersService} from '../services/helpers';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.page.html',
  styleUrls: ['./rides.page.scss'],
})
export class RidesPage implements OnInit {
  rides: Observable<[Ride]>;
  constructor(
      private rideService: RideService,
      private helpersService: HelpersService,
  ) { }

  ngOnInit() {
    this.getRides();
  }

  async getRides () {
    this.rides = await this.rideService.getAll();
  }

  delete(id) {
    this.rideService.remove(id).subscribe(() => {
      this.helpersService.presentAlert({
        header: 'Atención',
        subHeader: 'Eliminado',
        message: 'Registro eliminado con éxito',
        buttons: ['OK']
      }).then(() => {
        this.getRides();
      });
    }, (error) => {
      console.log(error);
    });
  }
}
