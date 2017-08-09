import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Geolocation } from '@ionic-native/geolocation';

import { CategoriesPage } from '../pages/categories/categories';
import { ProductsPage } from '../pages/products/products';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MenuOptionsPage } from '../pages/menuOptions/menuOptions';

import { ShowProductModal } from '../modals/showProduct/showProduct';
import { MapModal } from '../modals/map/map';
import { SettingsModal } from '../modals/settings/settings';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import { StorageService } from '../services/storageService';

@NgModule({
  declarations: [
    MyApp,
    CategoriesPage,
    ProductsPage,
    ContactPage,
    HomePage,
    TabsPage,
    MenuOptionsPage,
    ShowProductModal,
    MapModal,
    SettingsModal
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CategoriesPage,
    ProductsPage,
    ContactPage,
    HomePage,
    TabsPage,
    MenuOptionsPage,
    ShowProductModal,
    MapModal,
    SettingsModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageService,
    Geolocation
  ]
})
export class AppModule {}
