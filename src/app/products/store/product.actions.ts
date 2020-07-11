import { Action } from '@ngrx/store';

import { Product } from '../product.model';

export const ADD_PRODUCT = 'ADD_PRODUCT';

export class AddProduct implements Action{
    readonly type = ADD_PRODUCT;
    payload: Product;
}
