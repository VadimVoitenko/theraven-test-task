import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Cart } from '../../../../../../shared/models/Cart';

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

  constructor(private formBuilder: FormBuilder) {
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
    if (this.orderForm.valid) {
      console.log(this.orderForm.value);
      const combinedData = { ...this.orderForm, ...this.localStorageData };
      console.log('Combined dada: ', combinedData);
    } else {
      // Add toastr
    }
  }
}
