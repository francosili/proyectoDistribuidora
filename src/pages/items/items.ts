import { Component, EventEmitter, Input, Output, ViewChild, OnInit, DoCheck, SimpleChanges} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ItemsService } from '../../services/itemsService';
import { StorageService } from '../../services/storageService';
import { Slides } from 'ionic-angular';
import { PopoverController, PopoverOptions } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';

import { defectValues, srcStorageImages, itemTypes } from '../../utils/constants';

@Component({
	selector: 'page-items',
	templateUrl: 'items.html'
})

export class ItemsPage{
	@Input() itemType: string;
	@Input() categorySelected: string;
	@Input() indexActualSlide = 0;

	@Output() SelectItem = new EventEmitter();
    @ViewChild(Slides) slides: Slides;

	items;
	itemsReformated;
	itemSearched;

	actualSlide;

	cantItemsShowed: number;

	srcStorageImages = srcStorageImages;

	constructor(
		public navCtrl: NavController,
		private itemsService: ItemsService,
		private params: NavParams,
		public alertCtrl: AlertController,
		public popoverCtrl: PopoverController,
		private storageService: StorageService
	) {
		this.initValueItems(this.params)
	}

	initValueItems(params){
		if (!this.itemType) {
			this.itemType = params.data.itemType;
		};
		if (!this.categorySelected) {
			this.categorySelected = params.data.categorySelected;
		};
		if (!this.indexActualSlide) {
			this.indexActualSlide = params.data.indexActualSlide;
		};
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
			this.initItems(allItems);
		});

		this.storageService.getStorage('itemSearched').then(itemSearched => {
			this.itemSearched = itemSearched;
		});

	}

	initItems(itemsArray){
		this.items = this.itemsService.itemsToLowerCase(itemsArray);
		this.storageService.getStorage('itemsReformatedSearched').then(itemsReformatedSearched => {
			if (!itemsReformatedSearched) {
				this.itemsReformated = this.itemsService.chunkItems(this.cantItemsShowed, itemsArray);
			} else {
				this.itemsReformated = itemsReformatedSearched;	
			};
			this.setActualSlide(this.itemsReformated[this.indexActualSlide]);
		});
	}
	
	setActualSlide(actualSlide) {
		this.actualSlide = actualSlide;
	}

	reloadItems(ev: any) {
		this.itemsService.getItems(this.itemType, itemTypes.all).then(allItems => {
			let allItemsLower = this.itemsService.itemsToLowerCase(allItems);
			this.items = allItemsLower;
			let val = ev.target.value;
			this.storageService.setStorage('itemSearched', val);
			if (val && val.trim() != '') {
				this.items = allItemsLower.filter((item) => {
					let keyToFind = 'descripcion';
					return (item[keyToFind].toLowerCase().indexOf(val.toLowerCase()) > -1);
				})
			}
			this.itemsReformated = this.itemsService.chunkItems(this.cantItemsShowed, this.items);
			this.storageService.setStorage('itemsReformatedSearched', this.itemsReformated);
			this.indexActualSlide = 0;
			this.setActualSlide(this.itemsReformated[0]);
		});
	}


	slideReach(direc: string) {
		this.indexActualSlide = this.itemsService.getNextSlide(this.indexActualSlide, direc, this.itemsReformated.length);
		if (this.itemType === itemTypes.categories) {
			this.navCtrl.setRoot(ItemsPage, { itemType: itemTypes.categories, indexActualSlide: this.indexActualSlide });
		} else {
			this.navCtrl.setRoot(ItemsPage, { itemType: itemTypes.products, categorySelected: this.categorySelected, indexActualSlide: this.indexActualSlide});
		};
	}

	onClickItem(category: any) {
		if (this.itemType !== itemTypes.categories) return;
		this.navCtrl.setRoot(ItemsPage, { itemType: itemTypes.products, categorySelected: category.descripcion.toUpperCase(), indexActualSlide: 0});
	}

	onClickBackButton() {
		if (this.itemType === itemTypes.categories) {
			this.navCtrl.setRoot(HomePage);
		} else {
			this.navCtrl.setRoot(ItemsPage, { itemType: itemTypes.categories, indexActualSlide: 0 });
		}
	}


	changeStyleCards() {
		return this.itemsService.changeStyleCards(this.cantItemsShowed);
	}
}