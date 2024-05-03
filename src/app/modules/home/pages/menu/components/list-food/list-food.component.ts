import { Component } from '@angular/core';
import { IFood } from '../../../../../../shared/interfaces/IFood';
import { FoodService } from '../../../../services/food.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-list-food',
  standalone: true,
  imports: [RouterLink, NgFor, CurrencyPipe],
  templateUrl: './list-food.component.html',
  styleUrl: './list-food.component.scss',
})
export class ListFoodComponent {
  foodList: IFood[] = [];

  constructor(private foodService: FoodService) {
    this.foodList = foodService.getAll();
  }

  ngOnInit(): void {}
}
