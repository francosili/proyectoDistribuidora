import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

// Estos 3 imports para testear data mockeada
import { StorageService } from '../services/storageService';
import { AuthService } from '../services/authService';
import { productsMock } from '../test/mocks/productsMock'
import { categoriesMock } from '../test/mocks/categoriesMock'

import { defectValues } from '../utils/constants';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private storageService: StorageService,
    private authService: AuthService
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      // TODO: Antes de setear nuevos productos y categorieas quizas mirar si ya hay seteados
      // Igualmente, con los parametros en las consultas quizas estas consultas al BE no se hagan mas de aca
      // this.authService.getProductos().subscribe(resp => {
      //   this.storageService.setStorage('products', resp.json());
      // });


      this.storageService.getStorage('currentSeller').then(currentSeller => {
        console.log(currentSeller);
      })

      this.authService.getArticulos().subscribe(allProducts => {
        this.storageService.setStorage('products', allProducts.json());
      });

      
      this.authService.getCategorias().subscribe(allCategories => {
        this.storageService.setStorage('categories', allCategories.json());
      });

      //this.storageService.setStorage('categories', categoriesMock);
      //this.storageService.setStorage('products', productsMock);

      
      // this.storageService.getStorage('currentSeller').then(oldSeller => {
      //   if (!oldSeller) {
      //     this.storageService.setStorage('currentSeller', defectValues.seller);
      //   }
      // })


    });
  }
}
