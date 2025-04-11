import { Routes } from "@angular/router";
import { ContactFormComponent } from "./contact-form/contact-form.component";

export const CONTACTS_ROUTES: Routes = [
    {
        path: 'form',
        component: ContactFormComponent
    },
    { path: "**", redirectTo: "form" },
];
