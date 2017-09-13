import { Component, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { MapModal } from '../../modals/map/map';
import { SettingsModal } from '../../modals/settings/settings';
import { StorageService } from '../../services/storageService';

import { sellers, defectValues } from '../../utils/constants';

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
        private storageService: StorageService
    ) {
        this.sellers = sellers;
    }

    ngOnInit() {
        let categsToShowPromise = this.storageService.getStorage('categsToShow') ;
        let productsToShowPromise = this.storageService.getStorage('productsToShow');
        Promise.all([categsToShowPromise, productsToShowPromise]).then(itemsToShow => {
            let defectItemsToShow = 9;
            this.categsToShow = itemsToShow[0] ? itemsToShow[0] : defectItemsToShow;
            this.productsToShow = itemsToShow[1] ? itemsToShow[1] : defectItemsToShow;;  
        });

        this.currentSeller = defectValues.seller; //ARREGLAR ESTO
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
        if (newSeller) {
            this.storageService.setStorage('currentSeller', newSeller);
        };

        this.OnClickRadioButton.emit(newSeller);
    }


}
