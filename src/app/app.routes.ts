import { Routes } from '@angular/router';
import { MenuComponent } from './modules/home/pages/menu/menu.component';
import { CartPageComponent } from './modules/home/pages/cart-page/cart-page.component';

export const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'cart-page', component: CartPageComponent },
  
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  { path: '**', redirectTo: '/menu' },
];
