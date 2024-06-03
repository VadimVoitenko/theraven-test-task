import { Component } from '@angular/core';
import { Cart } from '../../../../../../shared/models/Cart';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../../../../../shared/models/CartItem';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CurrencyPipe, NgFor, NgIf],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss',
})
export class CartListComponent {
  orderList!: Cart;

  constructor(private cartService: CartService, private toastr: ToastrService) {
    this.cartService.getCartObservable().subscribe((newCart) => {
      this.orderList = newCart;
    });
  }

  removeFromCart(orderItem: CartItem) {
    this.cartService.removeFromCart(orderItem.foodItem.id);
    this.toastr.info('Видалено з корзини');
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
