import {Injectable} from '@angular/core';
import {TipoMaquinaria} from '../shared/tipoMaquinaria';
import {Observable} from 'rxjs';
import 'rxjs-compat/add/observable/of';
import 'rxjs-compat/add/operator/delay';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TipoMaquinariaService {

  constructor(private http: HttpClient) { }

  getTipos(): Observable<TipoMaquinaria[]> {
    // return Observable.of(ITEMS).delay(2000);
    return <Observable<TipoMaquinaria[]>>this.http.get(baseURL + 'tipos');
  }
}
