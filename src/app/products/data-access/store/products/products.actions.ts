
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../product.model';

export const productToCart = createActionGroup({
    source: 'CART',
    events: {
      'add product to cart': props<{
        product: Product;
      }>(),
      'remove product from cart': props<{
        productId: number;
      }>(),
      'update quantity': props<{
        productId: number;
        quantity:number
      }>(),
      'increase quantity': props<{
        productId: number;
        quantity:number
      }>(),
      'decrease quantity': props<{
        productId: number;
        quantity:number

      }>(),
    },
  });
