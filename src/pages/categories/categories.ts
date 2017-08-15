import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StorageService } from '../../services/storageService';
import { reformatCategories } from '../../services/utilsService';
import { ProductsPage } from '../../pages/products/products';
import { Slides } from 'ionic-angular';

@Component({
	selector: 'page-categories',
	templateUrl: 'categories.html'
})
export class CategoriesPage {
	@Output() SelectCategory = new EventEmitter();
    @ViewChild(Slides) slides: Slides;

	categories: string[];
	categorySearched: string;
	categoriesReformated;
	cantCategoriesShowed: number;

	constructor(
		public navCtrl: NavController,
		private storageService: StorageService
	) {}


	ngOnInit(){
		this.cantCategoriesShowed = 5;
		this.getCategories().then((resp)=>{
			//TODO: Setear cantidad de categorias a mostrar en las opciones
			this.categoriesReformated = reformatCategories(this.cantCategoriesShowed, this.categories);
		});
	}

	slideClick(){
		this.slides.slideNext();
	}

	getCategories() {
		return this.storageService.getStorage('categories').then(respCat => {
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
			this.categoriesReformated = reformatCategories(this.cantCategoriesShowed, this.categories);
		});
	}

	onClickCategory(cat: any) {
		this.SelectCategory.emit({category: cat});
	}

}
