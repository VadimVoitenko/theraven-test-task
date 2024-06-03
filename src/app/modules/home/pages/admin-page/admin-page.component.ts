import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../shared/layout/header/header.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [HeaderComponent, OrdersListComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
})
export class AdminPageComponent {}
