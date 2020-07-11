import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

import { Product } from '../../products/product.model';
import { DataStorageService } from '../../shared/services/data-storage.service';

@Component({
  selector: 'app-my-account',
  templateUrl: 'my-account.component.html'
})
export class MyAccountComponent implements OnInit, OnDestroy {
    myProducts: Observable<{ products: Product[] }>;

    constructor(
        ) {}

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    fetch() {
    }
}



