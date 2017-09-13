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

    // Por ahora esto retorna todos los items MENOS los items que son particularmente de un vendedor en particular.
    // Esto probablemnte cambie cuadno tenga el backend
    // getItems (type: string, categorySelected: string) {

    //     if (type === 'categories') {
    //         return this.storageService.getStorage('categories').then(allCategories => {
    //             return this.setCantProductsInCategoriesAndGet(allCategories);
    //         });
    //     } else if (type === 'products') {
    //         return this.storageService.getStorage('products').then(allProducts => {
    //             return this.storageService.getStorage('currentSeller').then(currentSeller => {
    //                 if (categorySelected === 'sales') {
    //                     return this.getSales(allProducts)
    //                 };
    //                 // Saco los productos que NO sean del currentSeller
    //                 let allProductsWithProducstOfCurrentSeller = allProducts;
    //                 _.remove(allProductsWithProducstOfCurrentSeller, prod => {
    //                     return (prod.vendedor && prod.vendedor !== currentSeller)
    //                 });
    //                 return this.getProductsByCategory(categorySelected,allProductsWithProducstOfCurrentSeller);
    //             })

    //         });
    //     }
    // }

    getItems (type: string, categorySelected: string) {

        if (type === 'categories') {
            return this.storageService.getStorage('categories').then(allCategories => {
                return this.setCantProductsInCategoriesAndGet(allCategories);
            });
        } else if (type === 'products') {
            return this.storageService.getStorage('products').then(allProducts => {
                return this.storageService.getStorage('currentSeller').then(currentSeller => {
                    if (categorySelected === 'sales') {
                        return this.getSales(allProducts)
                    };
                    // Saco los productos que NO sean del currentSeller
                    let allProductsWithProducstOfCurrentSeller = allProducts;
                    _.remove(allProductsWithProducstOfCurrentSeller, prod => {
                        return (prod.vendedor && prod.vendedor !== currentSeller)
                    });
                    return this.getProductsByCategory(categorySelected,allProductsWithProducstOfCurrentSeller);
                })

            });
        }
    }

    itemsToLowerCase(itemsArray) {
        let newItemsArray = itemsArray;
        
        newItemsArray = itemsArray.map(item => {
            item.descripcion = item.descripcion.toLowerCase();
            return item;
        });
        
        return newItemsArray;
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
    
    // TODO: Esto va a estar en backend
    setCantProductsInCategoriesAndGet(categoriesArray){
        // TODO: Mejorar?
        return Promise.all(_.map(categoriesArray, cat => {
            return this.getCantProductsOfACategory(cat.descripcion);
        })).then(cantProdInCat => {
            return _.map(categoriesArray, (cat, indexCat) => {
                let newCat = cat;
                newCat.cantProductos = cantProdInCat[indexCat];
                return newCat;
            });   
        });
    }


    // TODO: Esto va a quedar obsoleto cuando lo de arriba este en backend
    getCantProductsOfACategory(category: string) {        
        return this.getItems('products', category).then(products => {
            return products.length;
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
                return (item.idcategoria.descripcion === categorySelected);
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
            return ~item.descripcion.indexOf('OFERTA');
        });
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

/*

En la tabla de productos, los productos particulares de algún vendedor van a tener una key 'vendedor' 
que va a tener al vendedor que pertenece. Si no es un producto particular, no va a tener esta 
key (que sea una key opcional?).

En la consulta de los productos NO retornar los productos particulares de cada vendedor. 
Para retornar estos mandar en los parámetros de la consulta getProductos el nombre del vendedor, y que 
retorne solamente los productos particulares de ese vendedor. Luego agregarlos estos productos 
particulares de el vendedor a todos los productos.

*/