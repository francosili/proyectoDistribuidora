import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { StorageService } from './storageService';

@Injectable()
export class ItemsService {
    constructor(private storageService: StorageService) { }

    getItems (type: string, categorySelected: string) {
        if (type === 'categories') {
            return this.storageService.getStorage('categories').then(allCategories => {
                return allCategories;
                // return this.setCantProductsInCategoriesAndGet(allCategories);
            });
        } else if (type === 'products') {
            return this.storageService.getStorage('products').then(allProducts => {
                if (categorySelected === 'sales') {
                    return this.getSales(allProducts)
                };
                return this.getProductsByCategory(categorySelected, allProducts);
            });
        }
    }
    
    getProductsByCategory(categorySelected, allProducts){
        let selectedProducts;
        if (categorySelected === 'all') {
            selectedProducts = _.uniqBy(_.flatMap(allProducts), e => {
                return e;
            });
        } else {
            selectedProducts = _.filter(allProducts, (item) => {
                return (item.idcategoria.descripcion === categorySelected);
            });
        }
        return selectedProducts;
    }

    // Busco los productos que tienen en la categoria la palabra 'oferta'
    getSales(allProducts) {
        let selectedProducts = _.filter(allProducts, (item) => {
            return ~item.idcategoria.descripcion.indexOf('OFERTAS');
        });
        return selectedProducts;
    }

    getCantItemsShowed(itemType: string, categorySelected: string) {
        let cantSalesShowed: Number = 3;
		if (itemType === 'categories') {
            return this.storageService.getStorage('categsToShow'); 
        } else if (itemType === 'products') { 
            if (categorySelected === 'sales') {
                return Promise.resolve(cantSalesShowed);
            }
            return this.storageService.getStorage('productsToShow');
        };
    }

    chunkItems (cantItems: number, itemsCollection) {
        return _.chunk(itemsCollection, cantItems);
    }

    itemsToLowerCase(itemsArray) {
        let newItemsArray = itemsArray;
        
        newItemsArray = itemsArray.map(item => {
            item.descripcion = item.descripcion.toLowerCase();
            return item;
        });
        
        return newItemsArray;
    }

    changeStyleCards(cantItemsShowed) {
		let newStyleCards = {};

		if (cantItemsShowed <= 6) {
			newStyleCards['max-height'] = '50%';
			newStyleCards['max-width'] = '50%';
			if (cantItemsShowed <= 3){
				newStyleCards['top'] = '18%';
			}
		} else if (cantItemsShowed > 6 && cantItemsShowed < 10) {
			newStyleCards['max-height'] = '50%';
			newStyleCards['max-width'] = '20%';
		} else {
			newStyleCards['max-height'] = '40%';
			newStyleCards['max-width'] = '16%';
		}
		return newStyleCards;
    }
    
    optimizeSlides(itemsReformated, indexItemsOptimized){

        let auxItemsReformated = itemsReformated;

        // // Tengo que contar cuantos itemsOptimized voy de alguna manera
        // if (oldItemsOptimized) {
        //     auxItemsReformated = _.drop(auxItemsReformated, oldItemsOptimized.length);
            
        // }



        auxItemsReformated = _.drop(auxItemsReformated, indexItemsOptimized);

        let itemsOptimized = _.dropRight(auxItemsReformated, (auxItemsReformated.length - 2));
        // debugger;
        return itemsOptimized;

    }



    // getCantProductsOfACategory(category: string) {        
    //     return this.getItems('products', category).then(products => {
    //         return products.length;
    //     })
    // }

    // setCantProductsInCategoriesAndGet(categoriesArray){
    //     // TODO: Mejorar?
    //     return Promise.all(_.map(categoriesArray, cat => {
    //         return this.getCantProductsOfACategory(cat.descripcion);
    //     })).then(cantProdInCat => {
    //         return _.map(categoriesArray, (cat, indexCat) => {
    //             let newCat = cat;
    //             newCat.cantProductos = cantProdInCat[indexCat];
    //             return newCat;
    //         });   
    //     });
    // }

    // filterCategories(filterParam: string, categoriesCollection) {
    //     let newCategoriesCollection = categoriesCollection;
    //     if (filterParam === 'onlyWithProducts') {
    //         newCategoriesCollection = _.filter(newCategoriesCollection, (cat) => {
    //             return cat.cantProductos > 0;    
    //         });
    //     }
    //     return newCategoriesCollection;
    // }

   
}