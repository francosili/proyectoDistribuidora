import { Component, EventEmitter, Output } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StorageService } from '../../services/storageService';
import { ProductsPage } from '../../pages/products/products';

@Component({
	selector: 'page-categories',
	templateUrl: 'categories.html'
})
export class CategoriesPage {
	@Output() SelectCategory = new EventEmitter();

	categories: string[];
	categorySearched: string;

	constructor(
		public navCtrl: NavController,
		private storageService: StorageService
	) {}

	getCategories() {
		return this.storageService.getStorage('categories').then(respCat => {
			console.log(respCat);
			this.categories = respCat;
		})
	}

	reloadCategories(ev: any) {
		this.getCategories().then(() => {
			let val = ev.target.value;
			if (val && val.trim() != '') {
				this.categories = this.categories.filter((cat) => {
					return (cat.toLowerCase().indexOf(val.toLowerCase()) > -1);
				})
			}
		});
	}

	onClickCategory(cat: any) {
		this.SelectCategory.emit({category: cat});
	}

}
