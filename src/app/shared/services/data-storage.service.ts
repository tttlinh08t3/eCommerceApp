import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { Product } from '../../products/product.model';
import { ProductService } from '../../products/product.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(
        private httpClient: HttpClient,
        private productService: ProductService) {}

    storeProducts() {
        const products = this.productService.getProducts();
        return this.httpClient
            .put('https://ecommerceapp-3139d.firebaseio.com/products.json', products)
            .subscribe(response => {
                console.log(response);
            }
        );
    }

    fetchProducts() {
        return this.httpClient
            .get<Product[]>('https://ecommerceapp-3139d.firebaseio.com/products.json')
            .pipe(
            map(products => {
                return products.map(product => {
                return {
                    ...product,
                    image: product.image ? product.image : '../../assets/img/Table1.jpg'
                };
                });
            }),
            tap(products => {
                this.productService.setProducts(products);
            })
        );
      }
}
