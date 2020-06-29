import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Product } from '../products/product.model';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
    productsChanged = new Subject<Product[]>();
    private products: Product[] = [];
    constructor(private http: HttpClient, private authService: AuthService) {}

//   storeRecipes() {
//     const recipes = this.recipeService.getRecipes();
//     this.http
//       .put(
//         'https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json',
//         recipes
//       )
//       .subscribe(response => {
//         console.log(response);
//       });
//   }

  fetchProducts() {
    this.authService.user.pipe(take(1), exhaustMap(user => {
        return this.http
        .get<Product[]>(
            'https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json', // will change
            {
                params: new HttpParams().set('auth', user.getToken())
            }
        );
    }),
        map(products => {
          return products.map(product => {
            return {
              ...product
            };
          });
        }),
        tap(products => {
          this.setProducts(products);
        })
      );
  }

  setProducts(products: Product[]) {
    this.products = products;
    this.productsChanged.next(this.products.slice());
  }
}
