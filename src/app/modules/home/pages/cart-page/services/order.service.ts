import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { IOrder } from '../../../../../shared/models/IOrder';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private firestore: Firestore) {}

  createOrder(orderData: IOrder) {
    const orderCollection = collection(this.firestore, 'orders');
    addDoc(orderCollection, orderData);
  }
}
