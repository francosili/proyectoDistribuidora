import { ViewController  } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'modal-settings',
  templateUrl: 'settings.html'
})
export class SettingsModal {

    constructor(
        public viewCtrl: ViewController
    ) { }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
