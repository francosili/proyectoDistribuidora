import * as _ from 'lodash';
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Slides } from 'ionic-angular';

import { CategoriesPage } from '../categories/categories';
import { ProductsPage } from '../../pages/products/products';

import { MenuOptionsPage } from '../../pages/menuOptions/menuOptions';
import { MenuController } from 'ionic-angular';

import { categoriesMock } from '../../test/mocks/categoriesMock'



@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild(Slides) slides: Slides;
    @ViewChild(ProductsPage) productsPage: ProductsPage;
    @ViewChild(CategoriesPage) categoriesPage: CategoriesPage;

    categorySearched: string;

    mycontent: string = 'ojasdojdas';

    constructor(
        public navCtrl: NavController,
        public menuCtrl: MenuController
    ) {};

    ngAfterViewInit(){
        this.initSlides();
    }

    // Inicializa las categorias y los productos (todos)
    initSlides() {
        this.categoriesPage.getCategories();
        this.productsPage.setCategory('todos');
        this.productsPage.getProducts();
    }

    slideDidChanged() {
        let currentIndex = this.slides.getActiveIndex();
        //El pager (3 puntitos) no se muestra en el primer slide
        if (currentIndex !== 0){
            this.slides.pager = true;
        } else {
            this.slides.pager = false;
        }
    }

    goToSlide(indexSlide) {
        // 1: categorias, 2: todos los productos
        

        this.slides.slideTo(indexSlide, 500);
    }

    selectCategory(event) {
        this.categorySearched = event.category;
        this.productsPage.setCategory(event.category);
        this.productsPage.getProducts();
        this.goToSlide(2);
    }

    openMenu() {
        this.menuCtrl.open();
    }

    closeMenu(){
        this.menuCtrl.close();
    }
}
