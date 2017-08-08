import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProductsService {
    private productsSource = new Subject<string[]>();
    products$ = this.productsSource.asObservable();
    
    setProducts(products: string[]) {
        this.productsSource.next(products);
    }

}