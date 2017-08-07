import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class InteractionService {

    // Observable string sources
    private categorySearchedSource = new Subject<string>();
    // private slideProductsSource = new Subject<boolean>();

    // Observable string streams
    categorySearched$ = this.categorySearchedSource.asObservable();
    // slideProducts$ = this.slideProductsSource.asObservable();

    // Service message commands
    setCategorySearched(category: string) {
        this.categorySearchedSource.next(category);
    }

    // goToProducts() {
    //     this.slideProd
    // }

}