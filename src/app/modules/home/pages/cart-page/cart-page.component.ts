import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../shared/layout/header/header.component';
import { CurrencyPipe, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CartFormComponent } from './components/cart-form/cart-form.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    HeaderComponent,
    NgFor,
    RouterLink,
    CurrencyPipe,
    CartListComponent,
    CartFormComponent,
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent {
  constructor() {}
}
