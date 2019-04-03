import {Injectable} from '@angular/core';
import {Item} from '../shared/item';
import {Observable} from 'rxjs';
import 'rxjs-compat/add/observable/of';
import 'rxjs-compat/add/operator/delay';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getItems(): Observable<Item[]> {
    // return Observable.of(ITEMS).delay(2000);
    return <Observable<Item[]>>this.http.get(baseURL + 'maquinarias');
  }

  getItem(id: number): Observable<Item> {
    return <Observable<Item>>this.http.post(baseURL + 'getMaquinaria', id, this.httpOptions);
  }

  getFeaturedItem(): Observable<Item> {
    return <Observable<Item>>this.http.get(baseURL + 'items?featured=true');
  }

  getItemIds(): Observable<number[]> {
    return <Observable<number[]>>this.http.get(baseURL + 'items').pipe(map(items => (<Item[]>items).map(item => item.id)));
  }

  saveItem(item): Observable<Item> {
    return <Observable<Item>>this.http.post<Item>(baseURL + 'saveMaquinaria', item, this.httpOptions);
  }

  getItemsByTipo(id): Observable<Item[]> {
    console.log(id);
    return <Observable<Item[]>>this.http.post(baseURL + 'maquinariasByTipo', id, this.httpOptions);
  }

  getItemsByMarca(marca): Observable<Item[]> {
    console.log(marca);
    return <Observable<Item[]>>this.http.post(baseURL + 'maquinariasByMarca', marca, this.httpOptions);
  }

  getItemsByModelo(modelo): Observable<Item[]> {
    console.log(modelo);
    return <Observable<Item[]>>this.http.post(baseURL + 'maquinariasByModelo', modelo, this.httpOptions);
  }

  getItemsByCapacidad(capacidad): Observable<Item[]> {
    console.log(capacidad);
    return <Observable<Item[]>>this.http.post(baseURL + 'maquinariasByCapacidad', capacidad, this.httpOptions);
  }

  getItemsByPrecio(precio): Observable<Item[]> {
    console.log(precio);
    return <Observable<Item[]>>this.http.post(baseURL + 'maquinariasByPrecio', precio, this.httpOptions);
  }

  DeleteItem(item): Observable<Item>
  {
    return <Observable<Item>>this.http.post(baseURL + 'deleteMaquinaria', item, this.httpOptions);
  }
}
