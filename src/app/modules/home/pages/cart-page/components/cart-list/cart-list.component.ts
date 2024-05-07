import { Component } from '@angular/core';
import { Cart } from '../../../../../../shared/models/Cart';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../../../../../shared/models/CartItem';
import { CurrencyPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CurrencyPipe, NgFor],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss',
})
export class CartListComponent {
  orderList!: Cart;

  constructor(private cartService: CartService) {
    this.cartService.getCartObservable().subscribe((newCart) => {
      this.orderList = newCart;
    });
  }

  removeFromCart(orderItem: CartItem) {
    this.cartService.removeFromCart(orderItem.foodItem.id);
  }

  increaseQuantity(orderItem: CartItem) {
    orderItem.quantity++;
    this.cartService.changeQuantity(orderItem.foodItem.id, orderItem.quantity);
  }

  decreaseQuantity(orderItem: CartItem) {
    if (orderItem.quantity > 1) {
      orderItem.quantity--;
      this.cartService.changeQuantity(
        orderItem.foodItem.id,
        orderItem.quantity
      );
    } else {
      this.removeFromCart(orderItem);
    }
  }
}
