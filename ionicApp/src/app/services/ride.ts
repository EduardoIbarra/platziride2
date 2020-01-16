import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Ride} from '../models/ride';
import {Observable} from 'rxjs';

@Injectable()
export class RideService {
  private modelUrl = 'ride';
  private url = environment.api_url;
  constructor(
      private http: HttpClient
  ) {}
  public getAll(): Observable<[Ride]> {
    return this.http.get(`${this.url}${this.modelUrl}`) as Observable<[Ride]>;
  }
}
