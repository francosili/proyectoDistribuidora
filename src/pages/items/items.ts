import * as _ from 'lodash';
import { Component, EventEmitter, Input, Output, ViewChild, OnInit,DoCheck, SimpleChanges} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ItemsService } from '../../services/itemsService';
import { Slides } from 'ionic-angular';
import { PopoverController, PopoverOptions } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';

import { defectValues } from '../../utils/constants';
import { itemTypes } from '../../utils/constants';

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

	// TODO: Probar cambia esto por (click) en el ion-option del ion-select
	ngDoCheck(){
		if (this.catFilterParam !== this.oldCatFilterParam) {
			console.log(this.allReformatedCategories);
			if (this.catFilterParam === 'all') {
				this.itemsReformated = this.allReformatedCategories;
				this.oldCatFilterParam = this.catFilterParam;
			} else {
				let auxItems = this.itemsService.filterCategories(this.catFilterParam, this.items);
				this.itemsReformated = this.itemsService.chunkItems(this.cantItemsShowed, auxItems);
				this.oldCatFilterParam = this.catFilterParam;
			};
			this.slides.slideTo(0);
		}
	}

	ngOnInit(){
		this.itemsService.getCantItemsShowed(this.itemType, this.categorySelected).then(itemsToShow => {
			if (itemsToShow) {
				this.cantItemsShowed = itemsToShow;
			} else {
				this.cantItemsShowed = defectValues.cantItemsShowed;
			}
		});

		this.itemsService.getItems(this.itemType, this.categorySelected).then((allItems)=>{
			console.log(allItems);
			this.initItems(allItems);
		});

	}
	

	initItems(itemsArray){
		this.items = this.itemsService.itemsToLowerCase(itemsArray);
		this.itemsReformated = this.itemsService.chunkItems(this.cantItemsShowed, itemsArray);
		if (this.itemType === itemTypes.categories) {
			this.allReformatedCategories = this.itemsReformated;
		};
	}

	reloadItems(ev: any) {
		this.itemsService.getItems(this.itemType, itemTypes.all).then(allItems => {
			let val = ev.target.value;
			let allItemsLower = this.itemsService.itemsToLowerCase(allItems);
			if (val && val.trim() != '') {
				this.items = allItemsLower.filter((item) => {
					let keyToFind = 'descripcion';
					
					return (item[keyToFind].toLowerCase().indexOf(val.toLowerCase()) > -1);
				})
			}
			this.itemsReformated = this.itemsService.chunkItems(this.cantItemsShowed, this.items);
		});
	}

	onClickItem(category: any) {
		if (this.itemType !== itemTypes.categories) return;
		
		if (category.cantProductos) {
			this.navCtrl.setRoot(ItemsPage, { itemType: itemTypes.products, categorySelected: category.descripcion.toUpperCase(), comeFromHome: false});
		} else {
			let alert = this.alertCtrl.create({
				title: 'Sin productos',
				subTitle: 'No hay productos en esta categoria',
				buttons: ['Ok']
			});
			alert.present();
		}
	}

	changeStyleCards() {
		return this.itemsService.changeStyleCards(this.cantItemsShowed);
	}

	onClickBackButton() {
		if (this.itemType === 'categories') {
			this.navCtrl.setRoot(HomePage);
		} else {
			this.navCtrl.setRoot(ItemsPage, { itemType: 'categories' });
		}
	}

}
