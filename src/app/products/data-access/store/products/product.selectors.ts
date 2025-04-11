import { createSelector } from "@ngrx/store";
import { cartReducer } from "./product.reducer";

const {selectCart}  = cartReducer
 
export const selectProductCart = createSelector(
    selectCart,(state)=>Object.values(state))

export const selectProductIds = createSelector(
    selectCart,(state)=>Object.keys(state) 
) 

export const selectIsProductINCart = (id:number)=> createSelector(selectProductIds,(state)=>state.includes(id?.toString()))
export const selectProductById = (id:number)=> createSelector(selectCart,(state)=>state[id])