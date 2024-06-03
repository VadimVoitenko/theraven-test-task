import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../modules/home/pages/cart-page/services/cart.service';
import { NgIf } from '@angular/common';
import { LocalStorageService } from '../../../core/services/local-storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  cartQuantity = 0;

  constructor(
    private cartService: CartService,
    private localStorageService: LocalStorageService
  ) {
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    });
  }

  isAdmin(): boolean {
    if (this.localStorageService.getItem('Role') === 'Admin') {
      return true;
    } else {
      return false;
    }
  }

  isUser(): boolean {
    if (this.localStorageService.getItem('Role') === 'User') {
      return true;
    } else {
      return false;
    }
  }
}
