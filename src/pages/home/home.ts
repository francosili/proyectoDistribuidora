import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItemsPage } from '../../pages/items/items';
import { MenuOptionsPage } from '../../pages/menuOptions/menuOptions';
import { MenuController } from 'ionic-angular';
import { categoriesMock } from '../../test/mocks/categoriesMock';
import { ItemsService } from '../../services/itemsService';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    categorySearched: string;
    salesPromise;

    constructor(
        public navCtrl: NavController,
        public menuCtrl: MenuController,
        private itemsService: ItemsService
    ) {};

    ngOnInit(){
        this.salesPromise = this.getSales();
    }

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

    getSales() {
        return this.itemsService.getItems('products').then((allItems)=>{
            let sales;
            let salesReformated;
            let auxItems = this.itemsService.getSales(allItems);

            sales = this.itemsService.itemsToLowerCase(auxItems, 'products');
		    salesReformated = this.itemsService.chunkItems(3, auxItems);
            return salesReformated;
		});
    }

}
