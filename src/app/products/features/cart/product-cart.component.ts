import { Component, computed, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SidebarModule } from 'primeng/sidebar';
import * as sidebarState from '../../data-access/store/sidebar'
import * as productCartState from '../../data-access/store/products'
import { ButtonModule } from 'primeng/button';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Product } from 'app/products/data-access/product.model';
@Component({
    standalone: true,
    imports: [SidebarModule,ButtonModule, CurrencyPipe, DecimalPipe],
    selector: 'app-product-cart',
    templateUrl: './product-cart.component.html',
    styleUrl:'./product-cart.component.scss'
})

export class ProcuctCartComponent {
    store = inject(Store)
    isOpen = this.store.selectSignal(sidebarState.selectIsOpen)
    products = this.store.selectSignal(productCartState.selectProductCart)
    totalPrice = computed(() =>
        this.products().reduce((sum, p) => sum + p.price * p.quantity, 0)
    );

    toggle(){
        this.store.dispatch(sidebarState.toggleSideBar())
    }

    removeFromCart(product: Product) {
        this.store.dispatch(productCartState.productToCart.removeProductFromCart({productId: product.id}))
    }
}
