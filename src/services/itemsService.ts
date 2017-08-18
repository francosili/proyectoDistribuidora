import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { StorageService } from './storageService';

@Injectable()
export class ItemsService {
    defaultItemsToShow: number;
    
    constructor(private storageService: StorageService) {
        this.defaultItemsToShow = 9;
    }

    chunkItems (cantItems: number, itemsCollection) {
        return _.chunk(itemsCollection, cantItems);
    }

    getItems (type: string) {
        if (type === 'categories') {
            return this.storageService.getStorage('categories');
        } else if (type === 'products') {
            return this.storageService.getStorage('products');
        };
    }

    itemsToLowerCase(itemsArray, typeItem) {
        let newItemsArray = itemsArray;
        
        newItemsArray = itemsArray.map(item => {
            if (typeItem === 'categories') {
                item.descripcionCategorias = item.descripcionCategorias.toLowerCase();
            } else if (typeItem === 'products') {
                item.descripcionProductos = item.descripcionProductos.toLowerCase();
            }
            return item;
        });
        
        return newItemsArray;
    }

    getCantItemsShowed(itemType: string) {
		if (itemType === 'categories') {
            return this.storageService.getStorage('categsToShow'); 
        } else if (itemType === 'products') { 
            return this.storageService.getStorage('productsToShow');
        };
    }
    
    setCantProductsInCategories(categoriesArray){
        // TODO: Esto esta funcando pero muta el this.items que llega
        // Mi idea era retornar una promise que de un nuevo array, fijarme
        // despues con mas tiempo.
        _.map(categoriesArray, cat => {
            return this.getCantProductsOfACategory(cat.descripcionCategorias).then(cantProducts => {
                let newCat = cat;
                newCat.cantProductos = cantProducts;
                return newCat;
            })
        })
    }

    getCantProductsOfACategory(category: string) {
        return this.getItems('products').then(products => {
            let cantProducts: number = 0;
            products.forEach(prod => {
                if(prod.categoria.descripcionCategorias.toLowerCase() === category.toLowerCase()){
                    cantProducts++;
                };
            });
            return cantProducts;
        })
    }


	setTitleFontSize(firstArrayItems){
		let newTitleFontSize
		if (firstArrayItems) {
			let lengthActualSlide = firstArrayItems.length;
			if (lengthActualSlide <= 12) {
				newTitleFontSize = '130%';
			} else if (lengthActualSlide > 12 && lengthActualSlide <= 20){
				newTitleFontSize = '110%';
			} else {
				newTitleFontSize = '100%';
			}
		}
		return newTitleFontSize
    }
    
    getProductsByCategory(categorySelected, allProducts){
        let selectedProducts;
        if (categorySelected === 'all') {
            selectedProducts = _.uniqBy(_.flatMap(allProducts), e => {
                return e;
            });
        } else {
            selectedProducts = _.filter(allProducts, (item) => {
                return (item.categoria.descripcionCategorias === categorySelected);
            });
        }
        return selectedProducts;
    }
}