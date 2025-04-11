import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from "@angular/core";
import { CurrencyPipe, NgClass } from "@angular/common";
import { Store } from "@ngrx/store";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { ChipModule } from 'primeng/chip';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule, PaginatorState } from "primeng/paginator";
import { TooltipModule } from "primeng/tooltip";
import * as productCartState from "../../data-access/store/products";
import { InputNumberModule } from 'primeng/inputnumber';

import { ProductsService } from "app/products/data-access/products.service";
import { Product } from "app/products/data-access/product.model";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";

const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
};

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DataViewModule, CardModule, ButtonModule, DialogModule, ProductFormComponent, PaginatorModule, ChipModule, NgClass, TooltipModule, CurrencyPipe,InputNumberModule],
})

export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  store = inject(Store)
  
  public readonly products = this.productsService.products;
  
  public isDialogVisible = false;
  public isCreation = false;
  public readonly editedProduct = signal<Product>(emptyProduct);
  first: number = 0;
  rows: number = 10;


  ngOnInit() {
    this.productsService.get().subscribe();
  }

  public onCreate() {
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedProduct.set(emptyProduct);
  }

  public onUpdate(product: Product) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedProduct.set(product);
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first!;
    this.rows = event.rows!;
  }

  getCategoryClass(category: string): string {
    switch (category) {
      case 'Electronics':
        return 'chip-electronics';
      case 'Accessories':
        return 'chip-accessories';
      case 'Clothing':
        return 'chip-clothing';
      case 'Fitness':
        return 'chip-fitness';
      default:
        return 'chip-default';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'INSTOCK':
        return 'pi-check';
      case 'LOWSTOCK':
        return 'pi-arrow-down-right';
      case 'OUTOFSTOCK':
        return 'pi-ban';
      default:
        return 'pi-question';
    }
  }

  public onDelete(product: Product) {
    this.productsService.delete(product.id).subscribe();
  }

  public onSave(product: Product) {
    if (this.isCreation) {
      this.productsService.create(product).subscribe();
    } else {
      this.productsService.update(product).subscribe();
    }
    this.closeDialog();
  }

  public onCancel() {
    this.closeDialog();
  }

  private closeDialog() {
    this.isDialogVisible = false;
  }

  addProductToCart(product: Product) {
    this.store.dispatch(productCartState.productToCart.addProductToCart(({ product })));
  }
  isProductInCart(productId:number){
    return this.store.selectSignal(productCartState.selectIsProductINCart(productId))()
  }
  getProductById(productId:number){
    return this.store.selectSignal(productCartState.selectProductById(productId))()
  }
  update(productId:number,quantity:number){
    this.store.dispatch(productCartState.productToCart.updateQuantity({productId,quantity}))
  }
}

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}