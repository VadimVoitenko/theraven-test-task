import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Cart } from '../../../../../../shared/models/Cart';
import { OrderService } from '../../services/order.service';
import { IOrder } from '../../../../../../shared/models/IOrder';
import { IOrderItems } from '../../../../../../shared/models/IOrderItems';

@Component({
  selector: 'app-cart-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './cart-form.component.html',
  styleUrl: './cart-form.component.scss',
})
export class CartFormComponent implements OnInit {
  initialPhoneValue: string = '+';
  orderForm!: FormGroup;
  localStorageData!: Cart;
  simplifiedItems: IOrderItems[] = [];
  orderData!: IOrder;

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService
  ) {
    const localStorageItem = localStorage.getItem('Cart');
    if (localStorageItem) {
      this.localStorageData = JSON.parse(localStorageItem);
    }
  }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.pattern(/^[a-zA-Z\s]*$/),
        ],
      ],
      surname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.pattern(/^[a-zA-Z\s]*$/),
        ],
      ],
      address: ['', [Validators.required, Validators.minLength(7)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+\d{10,15}$/)]],
    });
  }

  onSubmit() {
    if (!this.orderForm.valid) return;

    const { name, surname, address, phone } = this.orderForm.value;

    this.localStorageData.items.forEach((orderItem) => {
      const simplifiedItem = {
        name: orderItem.foodItem.name,
        totalPrice: orderItem.price,
        quantity: orderItem.quantity,
      };
      this.simplifiedItems.push(simplifiedItem);
    });

    const orderData = {
      name: name,
      surname: surname,
      address: address,
      phone: phone,
      // items: this.localStorageData.items,
      items: this.simplifiedItems,
      totalCount: this.localStorageData.totalCount,
      totalPrice: this.localStorageData.totalPrice,
    };

    this.orderService.createOrder(orderData);
  }
}
