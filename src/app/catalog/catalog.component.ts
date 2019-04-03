import {Component, Inject, OnInit} from '@angular/core';
import {Item} from '../shared/item';
import {ItemService} from '../services/item.service';
import {TipoMaquinariaService} from '../services/tipo-maquinaria.service';
import {TipoMaquinaria} from '../shared/tipoMaquinaria';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  items: Item[];
  listaTipos: TipoMaquinaria[];
  tipoMaquinaria={id:1};
  marcaField='';
  modeloField='';
  capacidadField='';
  precioField='';

  constructor(private itemService: ItemService, private tipoMaquinariaService: TipoMaquinariaService,
              @Inject('BaseURL') private BaseURL) {
  }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(items =>{console.log(items); this.items = items});
    this.tipoMaquinariaService.getTipos().subscribe(tipoMaquinarias =>{
      this.listaTipos = tipoMaquinarias;console.log(this.listaTipos);});
  }

  FilterByTipo()
  {
    this.itemService.getItemsByTipo(this.tipoMaquinaria.id).subscribe(
      items =>{console.log(items); this.items = items});
  }

  FilterByMarca()
  {
    this.itemService.getItemsByMarca(this.marcaField).subscribe(
      items =>{console.log(items); this.items = items});
  }

  FilterByModelo()
  {
    this.itemService.getItemsByModelo(this.modeloField).subscribe(
      items =>{console.log(items); this.items = items});
  }
  FilterByCapacidad()
  {
    this.itemService.getItemsByCapacidad(this.capacidadField).subscribe(
      items =>{console.log(items); this.items = items});
  }
  FilterByPrecio()
  {
    this.itemService.getItemsByPrecio(this.precioField).subscribe(
      items =>{console.log(items); this.items = items});
  }

  LoadAll()
  {
    this.itemService.getItems().subscribe(items =>{console.log(items); this.items = items});
  }

  Delete(item)
  {
    this.itemService.DeleteItem(item).subscribe();
    window.location.reload();
  }
}
