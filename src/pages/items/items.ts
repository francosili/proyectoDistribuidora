<<<<<<< HEAD
import { Component, EventEmitter, Input, Output, ViewChild, OnInit, AfterViewInit, DoCheck, SimpleChanges} from '@angular/core';
=======
import { Component, EventEmitter, Input, Output, ViewChild, OnInit,DoCheck, SimpleChanges} from '@angular/core';
>>>>>>> e1e9ee2511bb97cb1e672e13de37893815a94bef
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ItemsService } from '../../services/itemsService';
import { Slides } from 'ionic-angular';
import { PopoverController, PopoverOptions } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';

import { defectValues, srcStorageImages, itemTypes } from '../../utils/constants';

@Component({
	selector: 'page-items',
	templateUrl: 'items.html'
})
// export class ItemsPage implements DoCheck {
<<<<<<< HEAD
export class ItemsPage{// implements AfterViewInit {
=======
export class ItemsPage {
>>>>>>> e1e9ee2511bb97cb1e672e13de37893815a94bef
	@Input() itemType: string;
	@Input() categorySelected: string;
	// @Input() itemsOptimizedInput; 

	@Output() SelectItem = new EventEmitter();
    @ViewChild(Slides) slides: Slides;

	items;
	itemSearched: string;
	itemsReformated;
<<<<<<< HEAD

	@Input() itemsOptimized;
	indexItemsOptimized;

	cantItemsShowed: number;
=======
	cantItemsShowed: number;

	
	allReformatedCategories;
>>>>>>> e1e9ee2511bb97cb1e672e13de37893815a94bef

	srcStorageImages = srcStorageImages;

	constructor(
		public navCtrl: NavController,
		private itemsService: ItemsService,
		private params: NavParams,
		public alertCtrl: AlertController,
		public popoverCtrl: PopoverController
	) {
		this.initValueItems(this.params)
	}

	// ngAfterViewInit(){
	// 	console.log('ojadsojsajo');
	// 	// Despues probar con esto
	// 	// this.slides.ionSlideTransitionStart.emit();
	// }

	initValueItems(params){
		if (!this.itemType) {
			this.itemType = params.data.itemType;
		};
		if (!this.categorySelected) {
			this.categorySelected = params.data.categorySelected;
<<<<<<< HEAD
		};
		if (!this.itemsOptimized) {
			this.itemsOptimized = params.data.itemsOptimized;
		};
		this.indexItemsOptimized = 0;
=======
		}
		
>>>>>>> e1e9ee2511bb97cb1e672e13de37893815a94bef
	}

	ngOnInit(){
		console.log('oooooooooo');
		console.log(this.itemsOptimized);
		console.log('oooooooooo');

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

	}
	

	initItems(itemsArray){
		if (!this.itemsOptimized) {
		this.items = this.itemsService.itemsToLowerCase(itemsArray);
		this.itemsReformated = this.itemsService.chunkItems(this.cantItemsShowed, itemsArray);

			// debugger;
			this.itemsOptimized = this.itemsService.optimizeSlides(this.itemsReformated, this.indexItemsOptimized)
		}
		console.log(this.itemsOptimized);
		
	}

	reloadItems(ev: any) {
		this.itemsService.getItems(this.itemType, itemTypes.all).then(allItems => {
			let allItemsLower = this.itemsService.itemsToLowerCase(allItems);
			this.items = allItemsLower;
			let val = ev.target.value;
			if (val && val.trim() != '') {
				this.items = allItemsLower.filter((item) => {
					let keyToFind = 'descripcion';
					
					return (item[keyToFind].toLowerCase().indexOf(val.toLowerCase()) > -1);
				})
			}
			this.itemsReformated = this.itemsService.chunkItems(this.cantItemsShowed, this.items);
<<<<<<< HEAD
			

			// this.itemsOptimized = this.itemsService.optimizeSlides(this.itemsReformated, this.indexItemsOptimized);// ESTO VA A ROMPER!!
			
			
=======
>>>>>>> e1e9ee2511bb97cb1e672e13de37893815a94bef
			this.slides.slideTo(0);
		});
	}

	onClickItem(category: any) {
		if (this.itemType !== itemTypes.categories) return;
		
		this.navCtrl.setRoot(ItemsPage, { itemType: itemTypes.products, categorySelected: category.descripcion.toUpperCase(), comeFromHome: false});

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


	slideReachEnd() {

		console.log(this.slides.getActiveIndex());
	
		this.indexItemsOptimized = this.indexItemsOptimized + 2;
		this.itemsOptimized = this.itemsService.optimizeSlides(this.itemsReformated, this.indexItemsOptimized);
		// debugger;
		// Mirar esta solucion
		if (this.itemType === 'categories') {
			this.navCtrl.setRoot(ItemsPage, { itemType: 'categories', itemsOptimized: this.itemsOptimized });
			// debugger;
		} else {
			// this.navCtrl.setRoot(ItemsPage, { itemType: itemTypes.products, categorySelected: category.descripcion.toUpperCase(), comeFromHome: false});
		}

	}

	//ionSlideReachEnd event
	// slideReachEnd() {
	// 	console.log('IONSLIDEREACHEDD');
		
	// 	this.itemsOptimized = this.itemsService.optimizeSlides(this.itemsReformated, this.itemsOptimized);
	// }

}


	// catFilterParam: string;
	// oldCatFilterParam: string;

	//En InitValues
	// this.catFilterParam = 'all';
	// this.oldCatFilterParam = 'all';
	// TODO: Probar cambia esto por (click) en el ion-option del ion-select
	// ngDoCheck(){
	// 	if (this.catFilterParam !== this.oldCatFilterParam) {
	// 		console.log(this.allReformatedCategories);
	// 		if (this.catFilterParam === 'all') {
	// 			this.itemsReformated = this.allReformatedCategories;
	// 			this.oldCatFilterParam = this.catFilterParam;
	// 		} else {
	// 			let auxItems = this.itemsService.filterCategories(this.catFilterParam, this.items);
	// 			this.itemsReformated = this.itemsService.chunkItems(this.cantItemsShowed, auxItems);
	// 			this.oldCatFilterParam = this.catFilterParam;
	// 		};
	// 		this.slides.slideTo(0);
	// 	}
	// }
