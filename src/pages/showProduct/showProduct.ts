import { Platform, NavParams, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-showProduct',
  templateUrl: 'showProduct.html'
})
export class ShowProductPage {
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
