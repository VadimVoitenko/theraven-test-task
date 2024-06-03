import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnChanges, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { IOrder } from '../../../../../../shared/models/IOrder';
import { OrderService } from '../../../cart-page/services/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-completed-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatButton,
    CurrencyPipe,
  ],
  templateUrl: './completed-orders.component.html',
  styleUrl: './completed-orders.component.scss',
})
export class CompletedOrdersComponent implements OnInit {
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
    this.orderService.getCompletedOrders().subscribe(
      (response) => {
        this.dataSource.data = response;
      },
      (error) => {
        console.error('Getting Completed List of Rerquests failed: ', error);
      }
    );
  }

  deleteCompletedOrder(orderData: IOrder) {
    this.orderService.deleteCompletedOrder('sent_orders', orderData);
    this.toastr.success('Успішно видалено з архіву замовлень!');
    this.ngOnInit();
  }
}
