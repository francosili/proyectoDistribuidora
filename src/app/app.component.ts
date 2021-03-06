import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

// Estos 3 imports para testear data mockeada
import { StorageService } from '../services/storageService';
import { productsMock } from '../test/mocks/productsMock'
import { categoriesMock } from '../test/mocks/categoriesMock'

import { AuthService } from '../services/authService';
import { defectValues } from '../utils/constants';

import { AndroidPermissions } from '@ionic-native/android-permissions';

import { NavigationBar } from '@ionic-native/navigation-bar';


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
        private authService: AuthService,
        private androidPermissions: AndroidPermissions,
        private navigationBar: NavigationBar
    ) {
        platform.ready().then(() => {
            statusBar.styleDefault();
            statusBar.hide();
            splashScreen.hide();

            // this.storageService.setStorage('products', productsMock);
            // this.storageService.setStorage('categories', categoriesMock);
            // this.storageService.setStorage('currentSeller', defectValues.seller);
            
            this.storageService.getStorage('currentSeller').then(idCurrentSeller => {
                this.authService.getArticulos(idCurrentSeller).subscribe(allProducts => {
                    this.storageService.getStorage('products').then(currentProducts => {
                        if (allProducts !== currentProducts) {
                            this.storageService.setStorage('products', allProducts.json());
                        }
                    })
                });

                this.authService.getCategorias(idCurrentSeller).subscribe(allCategories => {

                    console.log(allCategories);

                    this.storageService.setStorage('categories', allCategories.json());
                });

                if (!idCurrentSeller) {
                    this.storageService.setStorage('currentSeller', defectValues.seller);
                }
            });
        

        });

        // Permiso necesario para agarrar imagenes del telefono
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
            success => console.log('Permission granted'),
            err => {
                console.log('errrr');
                this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE);
            }
        );

        // let autoHide: boolean = true;
        this.navigationBar.hideNavigationBar().then(
            success => console.log('Navigation bar sussefulled hide'),
            err => {
                console.log('No se escondió ni ahí');
            }
        )

    }
}
