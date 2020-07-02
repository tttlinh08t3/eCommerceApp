import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product } from '../products/product.model';
import { ProductService } from '../products/product.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
    products: Product[] = [];
    subscription: Subscription;

    constructor( private productService: ProductService, private dataStorageService: DataStorageService) {
    }

    ngOnInit() {
        this.subscription = this.productService.productsChanged
            .subscribe( (products: Product[]) => {
                this.products = products;
            }
        );
        this.products = this.productService.getProducts();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    fetch() {
        this.dataStorageService.fetchProducts().subscribe();
    }
}
