import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../modules/home/pages/cart-page/services/cart.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  cartQuantity = 0;

  constructor(cartService: CartService) {
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    });
  }
}
