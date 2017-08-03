import * as _ from 'lodash';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storageService';
import { productsMock } from '../../test/mocks/productsMock'
import { ModalController } from 'ionic-angular';
// import { ModalContentPage } from '../../components/modal/modalContentPage';

@Component({
  selector: 'page-products',
  templateUrl: 'products.html'
})
export class ProductsPage {
  category: string;
  products: string[];

  constructor(
        public navCtrl: NavController, 
        params: NavParams, 
        private storageService: StorageService) {
    this.category = params.get('category');    
    // Esta linea es para testear, dsps se borra
    this.storageService.setStorage('products', productsMock);
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    return this.storageService.getStorage('products').then(respProducts =>{
      this.products = _.get(respProducts, this.category);
    })
  }

  reloadProducts(ev: any) {
    // Reset items back to all of the items
    this.getProducts().then(()=>{
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
    console.log(prod);
  }

}
