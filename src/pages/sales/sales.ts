import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { Slides } from 'ionic-angular';

import { FileUploadService } from '../../services/fileUploadService';

@Component({
	selector: 'page-sales',
	templateUrl: 'sales.html',
    // providers: [Slides]

})
export class SalesPage {
    @Input() salesPromise;

    salesReformated = [];

    constructor(
        fileUploadService: FileUploadService
    ) {
        fileUploadService.test();
    }

    ngOnInit(){


        this.salesPromise.then(salesReformatedPromise => {
            this.salesReformated = salesReformatedPromise;
        })
    }


}

