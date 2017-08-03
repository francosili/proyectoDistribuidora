import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StorageService } from '../../services/storageService';

@Component({
  selector: 'page-products',
  templateUrl: 'products.html'
})
export class ProductsPage {
  respLocalStorage: '';

  constructor(public navCtrl: NavController, private storageService: StorageService) { }

  ngOnInit() {
    this.storageService.setStorage('caca', 'pichi');
    this.storageService.getStorage('caca').then(resp => {
      this.respLocalStorage = resp;
    });
  }

  // For test this click on Golosinas
  logRespLocalStorage() {
    console.log(this.respLocalStorage);
  }

}
