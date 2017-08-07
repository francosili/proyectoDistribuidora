import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StorageService } from '../../services/storageService';
import { ProductsPage } from '../../pages/products/products';
import { categoriesMock } from '../../test/mocks/categoriesMock'

@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html'
})
export class CategoriesPage {
  categories: string[];

  constructor(
      public navCtrl: NavController, 
      private storageService: StorageService,
    ) { 
    // Esta linea es para testear, dsps se borra
    this.storageService.setStorage('categories', categoriesMock);
  }
    
  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    return this.storageService.getStorage('categories').then(respCat =>{
      this.categories = respCat;
    })
  }

  reloadCategories(ev: any) {
    this.getCategories().then(()=>{
      let val = ev.target.value;
      if (val && val.trim() != '') {
        this.categories = this.categories.filter((cat) => {
          return (cat.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    });
  }

  onClickCategory(cat: any) {
    this.navCtrl.push(ProductsPage, { category: cat.toLowerCase() });
  }

}
