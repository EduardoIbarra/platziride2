import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Credential} from '../models/credential';

@Injectable()
export class AuthenticationService {
    private modelUrl = 'user';
    private url = environment.api_url;
    constructor(
        private http: HttpClient
    ) {}
    public login(credentials: Credential) {
        return this.http.post(`${this.url}${this.modelUrl}/login`, credentials);
    }
    public signup(credentials: Credential) {
        return this.http.post(`${this.url}${this.modelUrl}/signup`, credentials);
    }
}
