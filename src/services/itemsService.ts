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
    
    setCantProductsInCategoriesAndGet(categoriesArray){
        // TODO: Mejorar?
        return Promise.all(_.map(categoriesArray, cat => {
            return this.getCantProductsOfACategory(cat.descripcionCategorias);
        })).then(cantProdInCat => {
            return _.map(categoriesArray, (cat, indexCat) => {
                let newCat = cat;
                newCat.cantProductos = cantProdInCat[indexCat];
                return newCat;
            });   
        });


        // return Promise.all(_.map(categoriesArray, cat => {
        //     return this.getCantProductsOfACategory(cat.descripcionCategorias).then(cantProducts => {
        //         let newCat = cat;
        //         newCat.cantProductos = cantProducts;
        //         return newCat;
        //     })
        // }));
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

    filterCategories(filterParam: string, categoriesCollection) {
        let newCategoriesCollection = categoriesCollection;
        if (filterParam === 'onlyWithProducts') {
            newCategoriesCollection = _.filter(newCategoriesCollection, (cat) => {
                return cat.cantProductos > 0;    
            });
        }
        return newCategoriesCollection;
    }

    // Busco los productos que tienen en la categoria la palabra 'oferta'
    getSales(allProducts) {
        let selectedProducts = _.filter(allProducts, (item) => {
            return ~item.categoria.descripcionCategorias.indexOf('oferta');
        });
        console.log(selectedProducts);
        return selectedProducts;
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

}