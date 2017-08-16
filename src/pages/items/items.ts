import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storageService';
import { ItemsService } from '../../services/itemsService';
import { ProductsPage } from '../../pages/products/products';
import { Slides } from 'ionic-angular';

@Component({
	selector: 'page-items',
	templateUrl: 'items.html'
})
export class ItemsPage {
	@Input() itemType: string;
	
	@Output() SelectItem = new EventEmitter();
    @ViewChild(Slides) slides: Slides;

	items: string[];
	itemSearched: string;
	itemsReformated;
	cantItemsShowed: number;

	constructor(
		public navCtrl: NavController,
		private storageService: StorageService,
		private itemsService: ItemsService,
		private params: NavParams
	) {
		this.itemType = params.data.itemType;
	}


	ngOnInit(){
		//TODO: Setear cantidad de categorias a mostrar en las opciones
		//TODO: Por ahora MAX=28, sino quedan muy chicos y rompe el grid
		this.cantItemsShowed = 28;
		this.itemsService.getItems(this.itemType).then((resp)=>{
			this.items = resp;
			this.itemsReformated = this.itemsService.reformatItems(this.cantItemsShowed, this.items);
			console.log(this.itemsReformated);
		});
		
	}

	slideClick(){
		this.slides.slideNext();
	}
	
	reloadItems(ev: any) {
		this.itemsService.getItems(this.itemType).then(() => {
			let val = ev.target.value;
			if (val && val.trim() != '') {
				this.items = this.items.filter((item) => {
					return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
				})
			}
			this.itemsReformated = this.itemsService.reformatItems(this.cantItemsShowed, this.items);
			console.log(this.itemsReformated);
		});
	}

	onClickItem(cat: any) {
		this.SelectItem.emit({category: cat});
	}

}
