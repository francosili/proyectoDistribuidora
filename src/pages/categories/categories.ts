import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StorageService } from '../../services/storageService';
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

	constructor(
		public navCtrl: NavController,
		private storageService: StorageService
	) {}


	ngOnInit(){
		this.getCategories().then((resp)=>{

			this.reformatCategories();
		});
	}

	// formatea array categories en un array con varios arrays de 9 categoira
	// esto pa poder mostrar mejor
	reformatCategories(){
		let categoriesReformated = [];
		let auxNineCategoties = [];
		for (let i=0; i <= this.categories.length; i++) {
			auxNineCategoties.push(this.categories[i])
			// TODO: este if mejorarlo
			if ( i === this.categories.length-1 || i+1 === 9 || i+1 === 18 || i+1 === 27) {
				categoriesReformated.push(auxNineCategoties);
				auxNineCategoties = [];
			}
		}
		this.categoriesReformated = categoriesReformated;
	}

	slideClick(){
		console.log('CATEGORIES');
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
		});
	}

	onClickCategory(cat: any) {
		this.SelectCategory.emit({category: cat});
	}

}
