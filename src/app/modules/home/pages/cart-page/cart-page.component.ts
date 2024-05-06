import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../shared/layout/header/header.component';
import { Cart } from '../../../../shared/models/Cart';
import { CartService } from './services/cart.service';
import { CartItem } from '../../../../shared/models/CartItem';
import { CurrencyPipe, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartListComponent } from './components/cart-list/cart-list.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    HeaderComponent,
    NgFor,
    RouterLink,
    CurrencyPipe,
    CartListComponent,
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent {
  // orderList!: Cart;

  constructor(private cartService: CartService) {
    // this.cartService.getCartObservable().subscribe((newCart) => {
    //   this.orderList = newCart;
    //   console.log(newCart);
    // });
  }

  // removeFromCart(orderItem: CartItem) {
  //   this.cartService.removeFromCart(orderItem.foodItem.id);
  // }

  // increaseQuantity(orderItem: CartItem) {
  //   orderItem.quantity++;
  //   this.cartService.changeQuantity(orderItem.foodItem.id, orderItem.quantity);
  // }

  // decreaseQuantity(orderItem: CartItem) {
  //   if (orderItem.quantity > 1) {
  //     orderItem.quantity--;
  //     this.cartService.changeQuantity(
  //       orderItem.foodItem.id,
  //       orderItem.quantity
  //     );
  //   } else {
  //     this.removeFromCart(orderItem);
  //   }
  // }
}
