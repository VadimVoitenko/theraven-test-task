import { Food } from './Food';

export class CartItem {
  constructor(public foodItem: Food) {}
  quantity: number = 1;
  price: number = this.foodItem.price;
}
