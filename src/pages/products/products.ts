import * as _ from 'lodash';
import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storageService';


import { ModalController } from 'ionic-angular';
import { ShowProductPage } from '../showProduct/showProduct';

@Component({
    selector: 'page-products',
    templateUrl: 'products.html'
})
export class ProductsPage {
    @Input() category: string;
    products: string[];

    constructor(
        public navCtrl: NavController,
        private storageService: StorageService,
        public modalCtrl: ModalController
    ) { }

    setProducts(products: string []){
        this.products = products;
    }

    setCategory(cat) {
        this.category = cat;
    }

    getProducts() {
        return this.storageService.getStorage('products').then(respProducts => {
            if (this.category === 'todos') {
                this.products = _.uniqBy(_.flatMap(respProducts), e => {
                    return e;
                });
            } else {
                this.products = _.get(respProducts, this.category);
                console.log('Categ de Products: ' + this.category);
                console.log(this.products);
            }
        })
    }

    reloadProducts(ev: any) {
        // Reset items back to all of the items
        this.getProducts().then(() => {
            // set val to the value of the searchbar
            let val = ev.target.value;
            // if the value is an empty string don't filter the items
            if (val && val.trim() != '') {
                this.products = this.products.filter((prod) => {
                    return (prod.toLowerCase().indexOf(val.toLowerCase()) > -1);
                })
            }
        });
    }

    onClickProduct(prod: any) {
        let modal = this.modalCtrl.create(ShowProductPage, { product: prod });
        modal.present();
    }

}
