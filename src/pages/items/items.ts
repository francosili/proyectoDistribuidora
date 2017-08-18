import * as _ from 'lodash';
import { Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
		private params: NavParams
	) {
		this.itemType = params.data.itemType;
		this.categorySelected = params.data.categorySelected;
	}


	ngOnInit(){
		this.itemsService.getCantItemsShowed(this.itemType).then(itemsToShow => {
			if (itemsToShow) {
				this.cantItemsShowed = itemsToShow;
			} else {
				this.cantItemsShowed = 8;
			}
		});

		this.itemsService.getItems(this.itemType).then((resp)=>{
			this.items = resp;

			if (this.categorySelected) {
				if (this.categorySelected === 'all') {
					this.items = _.uniqBy(_.flatMap(resp), e => {
						return e;
					});
				} else {
					this.items = _.filter(resp, (item) => {
						return (item.categoria.descripcionCategorias === this.categorySelected);
					});
				}
			}
			if (this.itemType === 'categories') {
				this.itemsService.setCantProductsInCategories(this.items);
			}

			this.items = this.itemsService.itemsToLowerCase(this.items, this.itemType);
			this.itemsReformated = this.itemsService.chunkItems(this.cantItemsShowed, this.items);



			// Si existe this.itemsReformate[0] es porque hay alguna card
			if (this.itemsReformated[0]) {
				let lengthActualSlide = this.itemsReformated[0].length;
				if (lengthActualSlide <= 12) {
					this.itemTitleFontSize = '130%';
				} else if (lengthActualSlide > 12 && lengthActualSlide <= 20){
					this.itemTitleFontSize = '110%';
				} else {
					this.itemTitleFontSize = '100%';
				}
			}
		});


	}

	slideClick(){
		// TODO: Probar esto en tablet (Por ahora lo saco porque al clickear a veces mueve
		//en vez de seleccionar una categoria)
		// this.slides.slideNext();
	}
	
	reloadItems(ev: any) {
		this.itemsService.getItems(this.itemType).then(() => {
			let val = ev.target.value;
			console.log(val);
			if (val && val.trim() != '') {
				this.items = this.items.filter((item) => {
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
		});
	}

	onClickItem(category: any) {
		this.navCtrl.push(ItemsPage, { itemType: 'products', categorySelected: category.descripcionCategorias.toUpperCase()});
	}

}
