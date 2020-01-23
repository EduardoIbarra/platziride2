import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class WeatherService {
  private url = environment.openWeatherMap_url;
  constructor(
      private http: HttpClient
  ) {}
  public getWeather(location) {
    return this.http.get(`${this.url}lat=${location.lat}&lon=${location.lng}&APPID=985b733b5749f621ad8ca0d0fa9f6dcc&units=metric`);
  }
}
