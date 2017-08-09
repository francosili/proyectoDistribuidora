import { Platform, NavParams, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'modal-showProduct',
  templateUrl: 'showProduct.html'
})
export class ShowProductModal {
    productName: string;

    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController
    ) {
        console.log(params.get('product'));
        this.productName = params.get('product');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
