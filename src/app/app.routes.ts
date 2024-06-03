import { Routes } from '@angular/router';
import { CartPageComponent } from './modules/home/pages/cart-page/cart-page.component';
import { MenuPageComponent } from './modules/home/pages/menu-page/menu-page.component';
import { AuthComponent } from './modules/auth/pages/auth/auth.component';
import { AdminPageComponent } from './modules/home/pages/admin-page/admin-page.component';
import { CompletedOrdersPageComponent } from './modules/home/pages/completed-orders-page/completed-orders-page.component';

export const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'menu', component: MenuPageComponent },
  { path: 'cart-page', component: CartPageComponent },
  { path: 'admin/order-list', component: AdminPageComponent },
  { path: 'admin/completed-orders', component: CompletedOrdersPageComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
