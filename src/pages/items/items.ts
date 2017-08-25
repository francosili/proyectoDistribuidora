import * as _ from 'lodash';
import { Component, EventEmitter, Input, Output, ViewChild, OnInit,DoCheck, SimpleChanges} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ItemsService } from '../../services/itemsService';
import { Slides } from 'ionic-angular';
import { PopoverController, PopoverOptions } from 'ionic-angular';
// import { FiltersPage } from '../../pages/filters/filters';


@Component({
	selector: 'page-items',
	templateUrl: 'items.html'
})
export class ItemsPage implements DoCheck {
	@Input() itemType: string;
	@Input() categorySelected: string;

	@Output() SelectItem = new EventEmitter();
    @ViewChild(Slides) slides: Slides;

	items;
	itemSearched: string;
	itemsReformated;
	cantItemsShowed: number;
	itemTitleFontSize: string;

	catFilterParam: string;
	oldCatFilterParam: string;
	allReformatedCategories;


	constructor(
		public navCtrl: NavController,
		private itemsService: ItemsService,
		private params: NavParams,
		public alertCtrl: AlertController,
		public popoverCtrl: PopoverController
	) {
		this.initValueItems(this.params)
	}

	initValueItems(params){
		if (!this.itemType) {
			this.itemType = params.data.itemType;
		}
		if (!this.categorySelected) {
			this.categorySelected = params.data.categorySelected;
		}
		this.catFilterParam = 'all';
		this.oldCatFilterParam = 'all';
	}

	ngDoCheck(){
		if (this.catFilterParam !== this.oldCatFilterParam) {
			if (this.catFilterParam === 'all') {
				this.itemsReformated = this.allReformatedCategories;
				this.oldCatFilterParam = this.catFilterParam;
			} else {
				let auxItems = this.itemsService.filterCategories(this.catFilterParam, this.items);
				this.initItems(auxItems);
				this.oldCatFilterParam = this.catFilterParam;
			}
		}
	}

	ngOnInit(){
		if (this.categorySelected !== 'sales') {
			this.itemsService.getCantItemsShowed(this.itemType).then(itemsToShow => {
				// TODO: POner valor por defecto de cantItemsShowed en variabels globales en algun lado
				if (itemsToShow) {
					this.cantItemsShowed = itemsToShow;
				} else {
					this.cantItemsShowed = 8;
				}
			});
		} else {
			this.cantItemsShowed = 3;
		}

		this.itemsService.getItems(this.itemType).then((allItems)=>{
			if (this.itemType === 'categories') {
				this.itemsService.setCantProductsInCategoriesAndGet(allItems).then(newItems => {
					// let auxItems = this.itemsService.filterCategories(this.catFilterParam, newItems);
					this.initItems(newItems);
					this.allReformatedCategories = this.itemsReformated;
				});	
			} else if (this.itemType === 'products' && this.categorySelected === 'sales') {
				
				let auxItems = this.itemsService.getSales(allItems);
				this.initItems(auxItems);
			} else if (this.itemType === 'products' && this.categorySelected !== 'sales') {
				let auxItems = this.itemsService.getProductsByCategory(this.categorySelected, allItems);
				this.initItems(auxItems);
			}
			
		});

	}
	

	initItems(itemsArray){
		this.items = this.itemsService.itemsToLowerCase(itemsArray, this.itemType);
		this.itemsReformated = this.itemsService.chunkItems(this.cantItemsShowed, itemsArray);
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
		});
	}

	onClickItem(category: any) {
		this.itemsService.getCantProductsOfACategory(category.descripcionCategorias).then(cantItems => {
			if (cantItems) {
				this.navCtrl.push(ItemsPage, { itemType: 'products', categorySelected: category.descripcionCategorias.toUpperCase()});
			} else {
				let alert = this.alertCtrl.create({
					title: 'Sin productos',
					subTitle: 'No hay productos en esta categoria',
					buttons: ['Ok']
				});
				alert.present();
			}
		});
	}

	changeStyleCards() {
		return this.itemsService.changeStyleCards(this.cantItemsShowed);
	}

	slideClick(){
		// TODO: Probar esto en tablet (Por ahora lo saco porque al clickear a veces mueve
		//en vez de seleccionar una categoria)
		// this.slides.slideNext();
	}

	//TODO: despues probar este a ver si da mas performance
	ngOnChanges(changes: SimpleChanges) {
		// console.log ('ngonchanges');
		// console.log(changes);
	}

}
