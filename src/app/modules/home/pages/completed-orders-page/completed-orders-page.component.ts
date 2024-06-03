import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../shared/layout/header/header.component';
import { CompletedOrdersComponent } from './components/completed-orders/completed-orders.component';

@Component({
  selector: 'app-completed-orders-page',
  standalone: true,
  imports: [HeaderComponent, CompletedOrdersComponent],
  templateUrl: './completed-orders-page.component.html',
  styleUrl: './completed-orders-page.component.scss',
})
export class CompletedOrdersPageComponent {}
