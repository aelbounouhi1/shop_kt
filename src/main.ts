import { enableProdMode, importProvidersFrom, isDevMode } from "@angular/core";

import { registerLocaleData } from "@angular/common";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import localeFr from "@angular/common/locales/fr";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { APP_ROUTES } from "app/app.routes";
import { ConfirmationService, MessageService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { AppComponent } from "./app/app.component";
import { environment } from "./environments/environment";
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import * as sideBarState from "./app/products/data-access/store/sidebar";
import * as cartProducts from "./app/products/data-access/store/products";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideRouter(APP_ROUTES),
    ConfirmationService,
    MessageService,
    DialogService,
    provideStore(),
    provideState(sideBarState.sidebarReducer),
    provideState(cartProducts.cartReducer),
    provideEffects(),
    provideStoreDevtools({name:"Kata", maxAge: 25, logOnly: !isDevMode() })
],
}).catch((err) => console.log(err));

registerLocaleData(localeFr, "fr-FR");
