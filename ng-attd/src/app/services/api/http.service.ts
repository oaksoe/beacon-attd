import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
};

@Injectable()
export class HttpService<T> {

    private apiBaseUrl: string;

    constructor(
        private http: HttpClient,
        private configService: ConfigService
        ) {
        const config = this.configService.getConfig();
        this.apiBaseUrl = 'http://' + config.api.host + ':' + config.api.port + '/v1/hdesk';
    }

    public post(url: string, object: T) : Observable<T> {
        return this.http.post<T>(this.apiBaseUrl + url, object, httpOptions);
    }

    public postFile(url: string, object: T) : Observable<T> {
        return this.http.post<T>(this.apiBaseUrl + url, object);
    }

    public put(url: string, object: T) : Observable<T> {
        return this.http.put<T>(this.apiBaseUrl + url, object, httpOptions);
    }

    public get(url: string) : Observable<T> {
        return this.http.get<T>(this.apiBaseUrl + url, httpOptions);
    }

    public delete(url: string) : Observable<T> {
        return this.http.delete<T>(this.apiBaseUrl + url, httpOptions);
    }    
}
