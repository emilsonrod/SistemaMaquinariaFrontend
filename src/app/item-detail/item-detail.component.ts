import {Component, OnInit} from '@angular/core';
import {Item} from '../shared/item';
import {ItemService} from '../services/item.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {TipoMaquinariaService} from '../services/tipo-maquinaria.service';
import {TipoMaquinaria} from '../shared/tipoMaquinaria';
import {MaquinariaMediaService} from '../services/maquinaria-media.service';
import {Router} from "@angular/router";

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  item: Item = new Item();
  itemIds: number[];
  listaTipos: TipoMaquinaria[];
  selectedFile: ImageSnippet;
  media = {image : '', nombreMedia: null, maquinaria:'' };
  existItem = false;

  constructor(private itemService: ItemService,
              private tipoMaquinariaService: TipoMaquinariaService,
              private route: ActivatedRoute,
              private maquinariaMediaService: MaquinariaMediaService,
              private router: Router,
              private location: Location) {
  }

  ngOnInit() {    
    let that =this;
    this.tipoMaquinariaService.getTipos().subscribe(tipoMaquinarias =>{
      that.listaTipos = tipoMaquinarias;console.log(this.listaTipos);});
    this.route.params
        .switchMap((params: Params) => this.itemService.getItem(+params['id']))
        .subscribe(item => {console.log(item); that.item = item; that.existItem = true;});
  }

  goBack(): void {
    this.location.back();
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.media.image = event.target.result.split(',')[1];
      this.media.nombreMedia = file.name;
      let maquinaria = { id:this.item.id };
        let mediaForm = {image : event.target.result.split(',')[1], nombreMedia: file.name, maquinaria:maquinaria, estado:'AC' };
        this.maquinariaMediaService.saveMedia(mediaForm).subscribe(media =>{console.log(media)});
        this.router.navigate(['/catalog']);
    });

    reader.readAsDataURL(file);
  } 
}
