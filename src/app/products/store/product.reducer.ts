import { Action, Store } from '@ngrx/store';

import { Product } from '../product.model';
import * as ProductActions from './product.actions';

const initialState = {
    products: [
        new Product('Table', 'Tables', '/'),
        new Product('Shelf', 'Shelf', '/'),
    ]
};

export function ProductReducer(
    state = initialState,
    action: ProductActions.AddProduct) {
    switch (action.type) {
        case ProductActions.ADD_PRODUCT:
            return {
                ...state,
                products:  [...state.products, action.payload]
            };
        default:
            return state;
    }
}
