import { Component } from '@angular/core';
import { Food } from '../../../../../../shared/models/Food';
import { FoodService } from '../../../../services/food.service';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe, NgFor } from '@angular/common';
import { CartService } from '../../../cart-page/services/cart.service';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [RouterLink, NgFor, CurrencyPipe],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.scss',
})
export class MenuListComponent {
  foodList: Food[] = [];

  constructor(
    private foodService: FoodService,
    private cartService: CartService
  ) {
    this.foodList = this.foodService.getAll();
  }

  ngOnInit(): void {}

  addToCart(food: Food) {
    this.cartService.addToCart(food);
  }
}
