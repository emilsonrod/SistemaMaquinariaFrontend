import { Component, Inject, OnInit } from '@angular/core';
import {ItemService} from '../services/item.service';
import {TipoMaquinariaService} from '../services/tipo-maquinaria.service';
import {TipoMaquinaria} from '../shared/tipoMaquinaria';
import {MaquinariaMediaService} from '../services/maquinaria-media.service';
import {Router} from "@angular/router";

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-registrar-maquinariaa',
  templateUrl: './registrar-maquinariaa.component.html',
  styleUrls: ['./registrar-maquinariaa.component.scss']
})
export class RegistrarMaquinariaaComponent implements OnInit {

  listaTipos: TipoMaquinaria[];
  selectedFile: ImageSnippet;
  media = {image : '', nombreMedia: null, maquinaria:'' };

  item = {marca: '', modelo: '', capacidad: '', estadoStock: 'ES', estado: 'AC', precio: ''};
  tipoMaquinaria={id:1};

  constructor(private itemService: ItemService, private router: Router, private tipoMaquinariaService: TipoMaquinariaService,
    private maquinariaMediaService: MaquinariaMediaService, @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.tipoMaquinariaService.getTipos().subscribe(tipoMaquinarias =>{
      this.listaTipos = tipoMaquinarias;console.log(this.listaTipos);});
  }

  onSubmit() {
    // llamada a login de back end
    let maquinaria = {marca: this.item.marca, modelo: this.item.modelo, capacidad: this.item.capacidad, estadoStock: 'ES', estado: 'AC', precio: this.item.precio,
    tipoMaquinaria:this.tipoMaquinaria};
    this.itemService.saveItem(maquinaria).subscribe(item =>{
      if(this.media.nombreMedia)
      {
        let maquinaria = { id:item.id };
        let mediaForm = {image : this.media.image, nombreMedia: this.media.nombreMedia, maquinaria:maquinaria, estado:'AC' };
        this.maquinariaMediaService.saveMedia(mediaForm).subscribe(media =>{this.router.navigate(['/catalog']);console.log(media)});
      }
    });
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.media.image = event.target.result.split(',')[1];
      this.media.nombreMedia = file.name;
    });

    reader.readAsDataURL(file);
  } 
}
