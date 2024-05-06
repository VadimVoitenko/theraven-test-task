import { Routes } from '@angular/router';
import { CartPageComponent } from './modules/home/pages/cart-page/cart-page.component';
import { MenuPageComponent } from './modules/home/pages/menu-page/menu-page.component';

export const routes: Routes = [
  { path: 'menu', component: MenuPageComponent },
  { path: 'cart-page', component: CartPageComponent },

  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  { path: '**', redirectTo: '/menu' },
];
