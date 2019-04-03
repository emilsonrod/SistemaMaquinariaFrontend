import { Injectable } from '@angular/core';
import {MaquinariaMedia} from '../shared/maquinariaMedia';
import {Observable} from 'rxjs';
import 'rxjs-compat/add/observable/of';
import 'rxjs-compat/add/operator/delay';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MaquinariaMediaService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  saveMedia(media): Observable<MaquinariaMedia> {
    return <Observable<MaquinariaMedia>>this.http.post<MaquinariaMedia>(baseURL + 'saveMaquinariaMedia', media, this.httpOptions);
  }
}
