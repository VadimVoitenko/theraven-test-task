import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../shared/layout/header/header.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent {}
