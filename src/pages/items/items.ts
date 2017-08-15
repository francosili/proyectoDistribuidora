import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StorageService } from '../../services/storageService';
import { reformatItems, getItems } from '../../services/itemsService';
import { ProductsPage } from '../../pages/products/products';
import { Slides } from 'ionic-angular';

@Component({
	selector: 'page-items',
	templateUrl: 'items.html'
})
export class ItemsPage {
	@Output() SelectItem = new EventEmitter();
    @ViewChild(Slides) slides: Slides;

	items: string[];
	itemSearched: string;
	itemsReformated;
	cantItemsShowed: number;

	constructor(
		public navCtrl: NavController,
		private storageService: StorageService
	) {}


	ngOnInit(){
		//TODO: Setear cantidad de categorias a mostrar en las opciones
		this.cantItemsShowed = 5;
		getItems('categories').then((resp)=>{
			this.itemsReformated = reformatItems(this.cantItemsShowed, this.items);
		});
	}

	slideClick(){
		this.slides.slideNext();
	}

	
	reloadItems(ev: any) {
		getItems('categories').then(() => {
			let val = ev.target.value;
			if (val && val.trim() != '') {
				this.items = this.items.filter((cat) => {
					return (cat.toLowerCase().indexOf(val.toLowerCase()) > -1);
				})
			}
			this.itemsReformated = reformatItems(this.cantItemsShowed, this.items);
		});
	}

	onClickItem(cat: any) {
		this.SelectItem.emit({category: cat});
	}

}
