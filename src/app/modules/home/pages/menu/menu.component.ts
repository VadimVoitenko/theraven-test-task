import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../shared/layout/header/header.component';
import { ListFoodComponent } from './components/list-food/list-food.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [HeaderComponent, ListFoodComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  constructor() {}
}
