import { Injectable } from '@angular/core';
import { Cart } from '../../../../../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../../../../../shared/models/Food';
import { CartItem } from '../../../../../shared/models/CartItem';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();

  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor(private toastr: ToastrService) {}

  addToCart(food: Food): void {
    let cartItem = this.cart.items.find((item) => item.foodItem.id === food.id);

    if (cartItem) {
      this.toastr.info('Вже додано!');
      return;
    } else {
      this.cart.items.push(new CartItem(food));
      this.toastr.success('Додано до корзини!');

      this.setCartToLocalStorage();
    }
  }

  removeFromCart(foodId: string): void {
    this.cart.items = this.cart.items.filter(
      (item) => item.foodItem.id != foodId
    );
    this.setCartToLocalStorage();
  }

  changeQuantity(foodId: string, quantity: number) {
    let cartItem = this.cart.items.find((item) => item.foodItem.id === foodId);
    if (!cartItem) {
      return;
    } else {
      cartItem.quantity = quantity;
      cartItem.price = quantity * cartItem.foodItem.price;
    }
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce(
      (sum, currentItem) => sum + currentItem.price,
      0
    );

    this.cart.totalCount = this.cart.items.reduce(
      (previousSum, currentItem) => previousSum + currentItem.quantity,
      0
    );

    const cartJson = JSON.stringify(this.cart);

    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
