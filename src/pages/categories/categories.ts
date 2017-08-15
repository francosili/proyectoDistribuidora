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
			//TODO: Setear cantidad de categorias a mostrar en las opciones
			this.reformatCategories(6);
		});
	}

	// formatea array categories en un array con varios arrays de 9 categoira
	// esto pa poder mostrar mejor
	reformatCategories(cantCategs: number){
		let categoriesReformated = [];
		let auxNineCategoties = [];
		for (let i=0; i <= this.categories.length; i++) {
			auxNineCategoties.push(this.categories[i])
			if (i === this.categories.length-1 || (i+1) % cantCategs === 0) {
				categoriesReformated.push(auxNineCategoties);
				auxNineCategoties = [];
			}
		}
		console.log(categoriesReformated);
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
