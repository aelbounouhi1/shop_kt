import {
  Component,
  inject,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { ButtonModule } from "primeng/button";
import { Store } from "@ngrx/store";
import * as sideBarState from './products/data-access/store/sidebar'
import { ProcuctCartComponent } from "./products/features/cart/product-cart.component";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, PanelMenuComponent, ButtonModule, ProcuctCartComponent],
})
export class AppComponent {
  title = "ALTEN SHOP";
  store = inject(Store);

  toggle(){
    this.store.dispatch(sideBarState.toggleSideBar())
  }
}
