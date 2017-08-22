import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItemsPage } from '../../pages/items/items';

import { MenuOptionsPage } from '../../pages/menuOptions/menuOptions';

import { MenuController } from 'ionic-angular';

import { categoriesMock } from '../../test/mocks/categoriesMock';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    categorySearched: string;

    // paramsItemsTest = { itemType: 'categories' }

    sales = 'sales';

    constructor(
        public navCtrl: NavController,
        public menuCtrl: MenuController
    ) {};

    goToPage(page: string) {
        switch (page) {
            case 'categoriesPage':
                this.navCtrl.push(ItemsPage, { itemType: 'categories' });
                // this.categoriesPage.getCategories();
                break;
            case 'productsPage':
                this.navCtrl.push(ItemsPage, { itemType: 'products', categorySelected: 'all' });
                break;                
        }
        
    }

    selectCategory(event) {
        this.categorySearched = event.category.descripcionCategorias;
    }

    openMenu() {
        this.menuCtrl.open();
    }

    closeMenu(){
        this.menuCtrl.close();
    }

    receiveItemsToShowFromMenuOptions(itemsToShow: number[]) {
        console.log(itemsToShow);
    }
}
