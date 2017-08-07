import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

import { CategoriesPage } from '../categories/categories';
import { ProductsPage } from '../../pages/products/products';

import { InteractionService } from '../../services/interactionService';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [InteractionService]
})
export class HomePage {
    @ViewChild(Slides) slides: Slides;
    categorySearched: string;

    constructor(
        public navCtrl: NavController,
        private interactionService: InteractionService
    ) {
        interactionService.categorySearched$.subscribe(category => {
            this.categorySearched = category;
        });
    };

    ngOnInit() {
        this.categorySearched = 'galletitas';
    }

    goToSlide(indexSlide) {
        this.slides.slideTo(indexSlide, 500);
    }
    slideChanged() {
        let currentIndex = this.slides.getActiveIndex();
    }
}
