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
  public create(ride: Ride) {
    return this.http.post(`${this.url}${this.modelUrl}`, ride);
  }
  public getAll(): Observable<[Ride]> {
    return this.http.get(`${this.url}${this.modelUrl}`) as Observable<[Ride]>;
  }
  public update(ride: Ride) {
    return this.http.patch(`${this.url}${this.modelUrl}/${ride.id}`, ride);
  }
  public getById(id: string): Observable<Ride> {
    return this.http.get(`${this.url}${this.modelUrl}/${id}`) as Observable<Ride>;
  }
  public remove(id: string) {
    return this.http.delete(`${this.url}${this.modelUrl}/${id}`);
  }
}
