import { Component, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { MapModal } from '../../modals/map/map';
import { SettingsModal } from '../../modals/settings/settings';

@Component({
    selector: 'page-menu-options',
    templateUrl: 'menuOptions.html'
})
export class MenuOptionsPage {
    @Output() CloseMenu = new EventEmitter();
    categsToShow: number;
    productsToShow: number;

    constructor(
        public navCtrl: NavController,
        public modalCtrl: ModalController
    ) {}

    ngOnInit() {
        //TODO: Valores por defecto, quizas extraer en un json aparte como variabels globales.
        this.categsToShow = 9;
        this.productsToShow = 15;
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

    onClickShowThumbnail(){
     
    }

}
