import { Component, OnInit } from '@angular/core';
import {DEFAULT_RIDE_OBJECT, Ride} from '../models/ride';
import {RideService} from '../services/ride';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';

declare const google: any;

@Component({
  selector: 'app-ride-form',
  templateUrl: './ride-form.page.html',
  styleUrls: ['./ride-form.page.scss'],
})
export class RideFormPage implements OnInit {
  ride: Ride = DEFAULT_RIDE_OBJECT;
  id: string;
  editing = false;
  masterWayPoint: string;
  wayPoints = [];
  legs = [];
  constructor(
      private rideService: RideService,
      private navCtrl: NavController,
      private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.editing = (this.id !== 'new');
  }

  save() {
    if (this.editing) {
      // Cosas acerca de editar
    } else {
      this.rideService.create(this.ride as Ride).subscribe(() => {
        this.navCtrl.pop();
      }, (error) => {
        console.log(error);
      });
    }
  }
}
