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
import { ToastrService } from 'ngx-toastr';
import { v4 as uuidv4 } from 'uuid';

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
    private orderService: OrderService,
    private toastr: ToastrService
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
          Validators.pattern(/^[a-zA-Zа-яА-ЯіїєґІЇЄҐ'.\s]*$/),
        ],
      ],
      surname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.pattern(/^[a-zA-Zа-яА-ЯіїєґІЇЄҐ'\s]*$/),
        ],
      ],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.pattern(/^[a-zA-Zа-яА-ЯіїєґІЇЄҐ0-9.,'\s-]+$/),
        ],
      ],
      phone: ['', [Validators.required, Validators.pattern(/^\+\d{12}$/)]],
    });
  }

  onSubmit() {
    const currentTime = new Date();

    if (this.orderForm.valid) {
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
        // id: uuidv4(),
        // id: 'uuidv4-89098-1111',
        id: Date.now().toString(),
        name: name,
        surname: surname,
        address: address,
        phone: phone,
        items: this.simplifiedItems,
        totalCount: this.localStorageData.totalCount,
        totalPrice: this.localStorageData.totalPrice,
        sendTime: currentTime.toISOString().slice(0, -5),
      };

      this.orderService.addOrder(orderData);
      this.orderForm.reset();
      this.toastr.success('Успішне замовлення!');
    } else {
      this.toastr.warning(
        'Некоректне замовлення!',
        'Будь ласка, перевірте форму!'
      );
      return;
    }
  }
}
