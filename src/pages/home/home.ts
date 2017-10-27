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
import { Content } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild(Content) content: Content;
    
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
            this.currentSeller = sellers[idCurrentSeller - 1];
        });

        this.storageService.removeStorage('itemsReformatedSearched');
        this.storageService.removeStorage('itemSearched');

    }

    goToPage(page: string) {
        
        switch (page) {
            case 'categoriesPage':
                this.navCtrl.setRoot(ItemsPage, { itemType: 'categories', indexActualSlide: 0});
                break;
            case 'productsPage':
                this.navCtrl.setRoot(ItemsPage, { itemType: 'products', categorySelected: 'all', indexActualSlide: 0});
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

        this.authService.getCategorias(idNewCurrentSeller).subscribe(allCategories => {
        
            this.storageService.setStorage('categories', allCategories.json());
        });
        
// Para actualizar el home y los sales, esto va en la promise de arriba
            // this.navCtrl.setRoot(HomePage);
            // window.location.reload();

        // this.storageService.getStorage('products').then(spyProducts=>{
    
        //     this.salesPromise = this.getSales().then(sales => {
        //         return sales.push(this.itemsService.getSales(spyProducts))
        //     });
    
        //     setTimeout(() => {
                
        //         console.log('resize');
        //         this.content.resize();
        //         console.log(this.content.getContentDimensions());
        //     }, 500)
        // })
    }
        
        
}
    
    
    
