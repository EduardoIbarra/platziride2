import { Component, OnInit } from '@angular/core';
import {DEFAULT_RIDE_OBJECT, Ride} from '../models/ride';
import {RideService} from '../services/ride';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ride-form',
  templateUrl: './ride-form.page.html',
  styleUrls: ['./ride-form.page.scss'],
})
export class RideFormPage implements OnInit {
  ride: Ride = DEFAULT_RIDE_OBJECT;
  id: string;
  editing = false;
  constructor(
      private rideService: RideService,
      private navCtrl: NavController,
      private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.editing = (this.id !== 'new');
    if (this.editing) {
      this.rideService.getById(this.id).subscribe((result: Ride) => {
        this.ride = result;
      });
    }
  }

  save() {
    if (this.editing) {
      this.rideService.update(this.ride as Ride).subscribe(() => {
        this.navCtrl.pop();
      }, (error) => {
        console.log(error);
      });
      return;
    } else {
      this.rideService.create(this.ride as Ride).subscribe(() => {
        this.navCtrl.pop();
      }, (error) => {
        console.log(error);
      });
    }
  }
}
