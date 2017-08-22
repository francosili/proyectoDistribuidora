import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ItemsPage } from '../pages/items/items';
// import { FiltersPage } from '../pages/filters/filters';
import { HomePage } from '../pages/home/home';
import { MenuOptionsPage } from '../pages/menuOptions/menuOptions';
import { SalesPage } from '../pages/sales/sales';

import { ShowProductModal } from '../modals/showProduct/showProduct';
import { MapModal } from '../modals/map/map';
import { SettingsModal } from '../modals/settings/settings';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import { ItemsService } from '../services/itemsService';
import { StorageService } from '../services/storageService';
import { AuthService } from '../services/authService';
import { HttpModule } from '@angular/http';

import { FlexLayoutModule } from "@angular/flex-layout";


@NgModule({
  declarations: [
    MyApp,
    ItemsPage,
    HomePage,
    MenuOptionsPage,
    ShowProductModal,
    MapModal,
    SettingsModal,
    SalesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    FlexLayoutModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ItemsPage,
    HomePage,
    MenuOptionsPage,
    ShowProductModal,
    MapModal,
    SettingsModal,
    SalesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageService,
    AuthService,
    ItemsService
  ]
})
export class AppModule {}
