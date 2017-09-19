import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ItemsPage } from '../../pages/items/items';
import { MenuOptionsPage } from '../../pages/menuOptions/menuOptions';
import { MenuController } from 'ionic-angular';
import { categoriesMock } from '../../test/mocks/categoriesMock';
import { ItemsService } from '../../services/itemsService';
import { StorageService } from '../../services/storageService';
import { sellers, defectValues } from '../../utils/constants';

import { AuthService } from '../../services/authService';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    categorySearched: string;
    salesPromise;
    currentSeller: string;

    constructor(
        public navCtrl: NavController,
        public menuCtrl: MenuController,
        private itemsService: ItemsService,
        private storageService: StorageService,
        private authService: AuthService,
    ) {};

    ngOnInit(){
        this.salesPromise = this.getSales();

        this.storageService.getStorage('currentSeller').then(idCurrentSeller => {
            this.currentSeller = sellers[idCurrentSeller];
        });

    }

    goToPage(page: string) {
        
        switch (page) {
            case 'categoriesPage':
                this.navCtrl.setRoot(ItemsPage, { itemType: 'categories'});
                break;
            case 'productsPage':
                this.navCtrl.setRoot(ItemsPage, { itemType: 'products', categorySelected: 'all'});
                break;                
        }
        
    }

    selectCategory(event) {
        this.categorySearched = event.category.descripcion;
    }

    openMenu() {
        this.menuCtrl.open();
    }

    closeMenu(){
        this.menuCtrl.close();
    }

    getSales() {
        return this.itemsService.getItems('products', 'all').then((allItems)=>{
            let sales;
            let salesReformated;
            let auxItems = this.itemsService.getSales(allItems);

            sales = this.itemsService.itemsToLowerCase(auxItems);
		    salesReformated = this.itemsService.chunkItems(defectValues.cantSalesShowed, auxItems);
            return salesReformated;
		});
    }

    setNewCurrentSeller(idNewCurrentSeller) {
        this.currentSeller = sellers[idNewCurrentSeller - 1];

        this.authService.getArticulos(idNewCurrentSeller).subscribe(allProducts => {
            this.storageService.setStorage('products', allProducts.json());
        });

    }

    
}


