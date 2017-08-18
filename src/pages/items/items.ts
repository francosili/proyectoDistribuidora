import * as _ from 'lodash';
import { Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ItemsService } from '../../services/itemsService';
import { Slides } from 'ionic-angular';


@Component({
	selector: 'page-items',
	templateUrl: 'items.html'
})
export class ItemsPage {
	@Input() itemType: string;
	@Input() categorySelected: string;

	@Output() SelectItem = new EventEmitter();
    @ViewChild(Slides) slides: Slides;

	items: string[];
	itemSearched: string;
	itemsReformated;
	cantItemsShowed: number;
	itemTitleFontSize: string;

	constructor(
		public navCtrl: NavController,
		private itemsService: ItemsService,
		private params: NavParams,
		public alertCtrl: AlertController

	) {
		this.itemType = params.data.itemType;
		this.categorySelected = params.data.categorySelected;
	}

	ngOnInit(){
		this.itemsService.getCantItemsShowed(this.itemType).then(itemsToShow => {
			// TODO: POner valor por defecto de cantItemsShowed en variabels globales en algun lado
			if (itemsToShow) {
				this.cantItemsShowed = itemsToShow;
			} else {
				this.cantItemsShowed = 8;
			}
		});

		this.itemsService.getItems(this.itemType).then((allItems)=>{
			this.items = allItems;

			if (this.categorySelected) {
				this.items = this.itemsService.getProductsByCategory(this.categorySelected, allItems);
			}
			if (this.itemType === 'categories') {
				this.itemsService.setCantProductsInCategories(this.items);
			}

			this.items = this.itemsService.itemsToLowerCase(this.items, this.itemType);

			this.itemsReformated = this.itemsService.chunkItems(this.cantItemsShowed, this.items);

			this.itemTitleFontSize = this.itemsService.setTitleFontSize(this.itemsReformated[0]);
			
		});

	}

	
	reloadItems(ev: any) {
		this.itemsService.getItems(this.itemType).then(allItems => {
			let val = ev.target.value;
			let allItemsLower = this.itemsService.itemsToLowerCase(allItems, this.itemType);
			if (val && val.trim() != '') {
				this.items = allItemsLower.filter((item) => {
					let keyToFind: string;
					if (this.itemType === 'categories') {
						keyToFind = 'descripcionCategorias';
					} if (this.itemType === 'products') {
						keyToFind = 'descripcionProductos';
					};
					return (item[keyToFind].toLowerCase().indexOf(val.toLowerCase()) > -1);
				})
			}

			this.itemsReformated = this.itemsService.chunkItems(this.cantItemsShowed, this.items);
			console.log(this.items);
			console.log(this.itemsReformated);
		});
	}

	onClickItem(category: any) {
		this.itemsService.getCantProductsOfACategory(category.descripcionCategorias).then(cantItems => {
			if (cantItems) {
				this.navCtrl.push(ItemsPage, { itemType: 'products', categorySelected: category.descripcionCategorias.toUpperCase()});
			} else {
				let alert = this.alertCtrl.create({
					title: 'No hay stock',
					subTitle: 'No nos queda nada guacho',
					buttons: ['Sape']
				});
				alert.present();
			}
		});
	}

	slideClick(){
		// TODO: Probar esto en tablet (Por ahora lo saco porque al clickear a veces mueve
		//en vez de seleccionar una categoria)
		// this.slides.slideNext();
	}

}
