import { createReducer } from '@ngrx/store';
import { Product } from '../../product.model';
import { createFeature, on } from '@ngrx/store';
import * as productActions from './products.actions';

export interface State {
        cart: {[productId:number]: Product}
};

const initialState: State = {
        cart: [],
};

export const cartReducer =createFeature({
    name: 'cart',
    reducer:
    createReducer(
    initialState,
    on(
        productActions.productToCart.addProductToCart,
        (state, {product}) => {
            return {...state,cart:{...state.cart, [product.id]: {...product, quantity: 1}}};
        }
    ),
    on(
        productActions.productToCart.increaseQuantity,
        (state, {productId,quantity}) => {
          return {...state,cart: {...state.cart, [productId]:
             {...state.cart[productId], quantity: state.cart[productId].quantity + quantity}}}; 
        }),
    on(
        productActions.productToCart.updateQuantity,
        (state, {productId,quantity}) => {
            return {...state,cart: {...state.cart, [productId]:
                {...state.cart[productId], quantity}}}
        }),
    on(
        productActions.productToCart.decreaseQuantity,
        (state, {productId,quantity}) => {
            const cart = {...state.cart};
            const product = cart[productId];
            const quantityDiff = product.quantity - quantity
            return {...state,cart: {...state.cart, [productId]:
                {...state.cart[productId], quantity: quantityDiff > 0 ? state.cart[productId].quantity - quantity : 0}}}
        }),
    on(
        productActions.productToCart.removeProductFromCart,
        (state, {productId}) => {
            const cart = {...state.cart};
            delete cart[productId];
            return {...state, cart};
        })
)});