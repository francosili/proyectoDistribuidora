import * as _ from 'lodash';
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Slides } from 'ionic-angular';

import { CategoriesPage } from '../categories/categories';
import { ProductsPage } from '../../pages/products/products';

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

    constructor(
        public navCtrl: NavController
    ) {};

    goToSlide(indexSlide) {
        // 1: categorias, 2: todos los productos
        if (indexSlide === 1) {
            this.categoriesPage.getCategories();
        } else if (indexSlide === 2) {
            this.productsPage.setCategory('todos');
            this.productsPage.getProducts();
        }
        this.slides.slideTo(indexSlide, 500);
    }

    slideChanged() {
        let currentIndex = this.slides.getActiveIndex();
    }

    selectCategory(event) {
        this.categorySearched = event.category;
        this.productsPage.setCategory(event.category);
        this.productsPage.getProducts();
        this.goToSlide(2);
    }
}
