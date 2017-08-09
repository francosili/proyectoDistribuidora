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
    // TODO: Hacerlo output para pasarlo a products? home?
    showThumbnail: boolean;

    constructor(
        public navCtrl: NavController,
        public modalCtrl: ModalController
    ) {}

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
        console.log(this.showThumbnail);
    }

}
