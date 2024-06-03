import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { IOrder } from '../../../../../../shared/models/IOrder';
import { OrderService } from '../../../cart-page/services/order.service';
import { MatButton } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatButton,
    CurrencyPipe,
  ],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss',
})
export class OrdersListComponent implements OnInit {
  displayedColumns: string[] = [
    'sendTime',
    'name',
    'surname',
    'phoneNumber',
    'address',
    'orders',
    'totalPrice',
    'confirm',
  ];
  dataSource = new MatTableDataSource<IOrder>();

  constructor(
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(
      (response) => {
        this.dataSource.data = response;
        console.log(this.dataSource.data);
      },
      (error) => {
        console.error('Getting List of Requests failed: ', error);
      }
    );
  }

  sendOrder(orderData: IOrder) {
    this.orderService.addCompletedOrder(orderData);
    this.toastr.success('Замовлення успішно відправлено');
  }

  deleteOrder(orderData: IOrder) {
    this.orderService.deleteOrder('orders', orderData);
    this.ngOnInit();
  }
}
