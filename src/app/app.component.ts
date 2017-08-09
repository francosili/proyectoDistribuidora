import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { HomePage } from '../pages/home/home';
import { CategoriesPage } from '../pages/categories/categories';

// Estos 3 imports para testear data mockeada
import { StorageService } from '../services/storageService';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { productsMock } from '../test/mocks/productsMock'
import { categoriesMock } from '../test/mocks/categoriesMock'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = TabsPage;
  rootPage: any = HomePage;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private storageService: StorageService,
    private authServiceProvider: AuthServiceProvider
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      this.authServiceProvider.getProductos().subscribe(resp => {
        this.storageService.setStorage('products', resp.json());
      });

      this.authServiceProvider.getCategorias().subscribe(resp => {
        this.storageService.setStorage('categories', resp.json());
      });

    });
  }
}
