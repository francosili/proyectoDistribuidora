import { Injectable } from '@angular/core';
import { StorageService } from './storageService';

@Injectable()
export class ItemsService {
    defaultItemsToShow: number;
    
    constructor(private storageService: StorageService) {
        this.defaultItemsToShow = 9;
    }

    // Formatea array categories en un array con varios arrays de 9 categoira
    // esto pa poder mostrar mejor
    reformatItems (cantCategs: number, categoriesCollection) {
        let categoriesReformated = [];
        let auxNineCategoties = [];
        for (let i=0; i <= categoriesCollection.length; i++) {
            auxNineCategoties.push(categoriesCollection[i])
            if (i === categoriesCollection.length-1 || (i+1) % cantCategs === 0) {
                categoriesReformated.push(auxNineCategoties);
                auxNineCategoties = [];
            }
        }
        return categoriesReformated;
    }

    getItems (type: string) {
        if (type === 'categories') {
            return this.storageService.getStorage('categories');
        } else if (type === 'products') {
            return this.storageService.getStorage('products');
        }
    }

    getCantItemsShowed(itemType: string) {
		if (itemType === 'categories') {
            return this.storageService.getStorage('categsToShow'); 
        } else if (itemType === 'products') { 
            return this.storageService.getStorage('productsToShow');
        };
	}
}