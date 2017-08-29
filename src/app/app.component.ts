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

      // this.authService.getCategorias().subscribe(resp => {
      //   this.storageService.setStorage('categories', resp.json());
      // });

      this.storageService.setStorage('categories', categoriesMock);
      this.storageService.setStorage('products', productsMock);

      // Testeo si ya hay un seller, sino defino uno por defecto (marcelo, pero cambiar)
      this.storageService.getStorage('currentSeller').then(oldSeller => {
        if (!oldSeller) {
          console.log('No me está haciendo este setStorage anda a saber porque');
          this.storageService.setStorage('currentSeller', 'marcelo');

        }
      })


    });
  }
}
