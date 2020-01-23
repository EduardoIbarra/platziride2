import { Component, OnInit } from '@angular/core';
import {DEFAULT_RIDE_OBJECT, Ride} from '../models/ride';
import {RideService} from '../services/ride';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {WeatherService} from '../services/weather';

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
      private weatherService: WeatherService,
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

  addWayPoint() {
    this.wayPoints.push(this.masterWayPoint);
    this.masterWayPoint = '';
    this.getDistances();
  }

  public getDistances() {
    let thisWayPoints = this.wayPoints.slice(1, -1);
    thisWayPoints = thisWayPoints.map((wp) => ({location: wp, stopover: true}));
    if (this.wayPoints.length < 2) {
      return;
    }
    const directionsService = new google.maps.DirectionsService();
    const request = {
      origin: this.wayPoints[0],
      waypoints: thisWayPoints,
      destination: this.wayPoints[this.wayPoints.length - 1],
      travelMode: 'DRIVING',
      drivingOptions: {
        departureTime: new Date(this.ride.start),
        trafficModel: 'bestguess'
      },
      unitSystem: google.maps.UnitSystem.METRIC
    };
    directionsService.route(request, (result, status) => {
      this.legs = result.routes[0].legs;
      this.ride.wayPoints = [];
      this.legs.forEach((leg) => {
        const startLocation = {lat: leg.start_location.lat(), lng: leg.start_location.lng()};
        const endLocation = {lat: leg.end_location.lat(), lng: leg.end_location.lng()};
        this.weatherService.getWeather(startLocation).subscribe((data: any) => {
          console.log(data.main);
          this.ride.wayPoints.push({
            start_address: leg.start_address,
            start_location: startLocation,
            end_address: leg.end_address,
            end_location: endLocation,
            distance: leg.distance,
            duration: leg.duration,
            weather: data.main,
          });
        }, (error) => {
          console.log(error);
        });
      });
      console.log(this.ride);
    });
  }
}
