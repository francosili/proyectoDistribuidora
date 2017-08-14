import * as _ from 'lodash';
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

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
    categorySearched: string;

    mycontent: string = 'ojasdojdas';

    constructor(
        public navCtrl: NavController,
        public menuCtrl: MenuController
    ) {};

    goToPage(page: string) {
        switch (page) {
            case 'categoriesPage':
                this.navCtrl.push(CategoriesPage);
                // this.categoriesPage.getCategories();
                break;
            case 'productsPage':
                this.navCtrl.push(ProductsPage, { category: 'all' });
                break;                
        }
        
    }

    selectCategory(event) {
        this.categorySearched = event.category.descripcionCategorias;
        // this.productsPage.setCategory(event.category);
        // this.productsPage.getProducts();
        this.goToPage('productsPage');
    }

    openMenu() {
        this.menuCtrl.open();
    }

    closeMenu(){
        this.menuCtrl.close();
    }
}
