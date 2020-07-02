import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Product } from '../products/product.model';

@Injectable()
export class ProductService {
    productsChanged = new Subject<Product[]>();
    private products: Product[] = [];

    getProducts() {
        return this.products.slice();
    }

    setProducts(products: Product[]) {
        this.products = products;
        this.productsChanged.next(this.products.slice());
    }
}
