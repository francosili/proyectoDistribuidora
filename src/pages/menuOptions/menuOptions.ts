import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { MapModal } from '../../modals/map/map';
import { SettingsModal } from '../../modals/settings/settings';
import { StorageService } from '../../services/storageService';

import { sellers, defectValues } from '../../utils/constants';

import { AuthService } from '../../services/authService';



@Component({
    selector: 'page-menu-options',
    templateUrl: 'menuOptions.html'
})
export class MenuOptionsPage {
    
    @Output() CloseMenu = new EventEmitter();
    @Output() OnClickRadioButton = new EventEmitter();
    categsToShow: number;
    productsToShow: number;
    currentSeller: string;
    sellers: string[];

    constructor(
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        private storageService: StorageService,
        public alertCtrl: AlertController,
        private authService: AuthService,
        
    ) {
        this.sellers = sellers;
    }

    ngOnInit() {
        let categsToShowPromise = this.storageService.getStorage('categsToShow') ;
        let productsToShowPromise = this.storageService.getStorage('productsToShow');
        Promise.all([categsToShowPromise, productsToShowPromise]).then(itemsToShow => {
            this.categsToShow = itemsToShow[0] ? itemsToShow[0] : defectValues.cantItemsShowed;
            this.productsToShow = itemsToShow[1] ? itemsToShow[1] : defectValues.cantItemsShowed;;  
        });

        // this.currentSeller = defectValues.seller; //ARREGLAR ESTO
        this.storageService.getStorage('currentSeller').then(currentSeller => {
            if (currentSeller) {
                this.currentSeller = currentSeller;
            }
        });
    }

    openModal(nameModal: string) {
        if (nameModal === 'map') {
            this.modalCtrl.create(MapModal).present();
        } else if (nameModal === 'settings') {
            this.modalCtrl.create(SettingsModal).present();
        }
    }

    closeMenu() {
        this.CloseMenu.emit();
    }

    onRangeChange(itemType) {
        if(itemType === 'categories') {
            this.storageService.setStorage('categsToShow', this.categsToShow);
        } else if(itemType === 'products') {
            this.storageService.setStorage('productsToShow', this.productsToShow);
        } else {
            console.log('No se esta seteando el rango en el storage')
        }
    }

    onRadioChange(newSeller) {

        if (!newSeller) {
            return;
        };



        this.storageService.getStorage('currentSeller').then(currentSeller => {
            console.log(newSeller);
            console.log(currentSeller);
            if (currentSeller && (newSeller !== currentSeller)) {
                this.updateBD(newSeller, () => {
                    this.storageService.setStorage('currentSeller', newSeller);
                    
                    this.OnClickRadioButton.emit(newSeller);
        
                    let alert = this.alertCtrl.create({
                        title: 'Completado',
                        subTitle: 'Se actualizaron los productos del vendedor elegido',
                        buttons: ['Ok']
                    });
                    alert.present();
                }, err => {
                    this.currentSeller = currentSeller;

                    let alert = this.alertCtrl.create({
                        title: 'Error',
                        subTitle: 'No estás conectado al WIFI de la distribuidora',
                        buttons: ['Ok']
                    });
                    alert.present();
                })
            } else {
                console.log('NO');
                
            }
        })
    }


    updateBD(seller, onComplete, onError) {
        this.authService.getArticulos(seller).subscribe(allProducts => {
            this.storageService.setStorage('products', allProducts.json());
        }, onError, onComplete);
    }
    
    onClickUpdate() {        
        this.storageService.getStorage('currentSeller').then(currentSeller => {
            this.updateBD(currentSeller, () => {
                this.authService.getCategorias().subscribe(
                    allCategories => {
                        this.storageService.setStorage('categories', allCategories.json());
                    },
                    err => {
                        let alert = this.alertCtrl.create({
                            title: 'Error',
                            subTitle: 'No estás conectado al WIFI de la distribuidora',
                            buttons: ['Ok']
                        });
                        alert.present();
                    },
                    () => {
                        let alert = this.alertCtrl.create({
                            title: 'Completado',
                            subTitle: 'Se actualizaron los productos y las categorías',
                            buttons: ['Ok']
                        });
                        alert.present();              
                    }
                );
            }, err => {
                let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'No estás conectado al WIFI de la distribuidora',
                    buttons: ['Ok']
                });
                alert.present();
            });
        });
    }

}
