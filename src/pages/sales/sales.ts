import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { Slides } from 'ionic-angular';

@Component({
	selector: 'page-sales',
	templateUrl: 'sales.html',
    // providers: [Slides]

})
export class SalesPage {
    @Input() salesPromise;

    salesReformated = [];

    constructor(
    ) {}

    ngOnInit(){
        this.salesPromise.then(salesReformatedPromise => {
            this.salesReformated = salesReformatedPromise;
        })
    }


}

