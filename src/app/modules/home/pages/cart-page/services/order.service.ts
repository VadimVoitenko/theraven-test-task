import { IOrder } from './../../../../../shared/models/IOrder';
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from '@angular/fire/firestore';
import { Observable, Subject, from, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private firestore: Firestore) {}

  getOrders(): Observable<IOrder[]> {
    const orderRef = collection(this.firestore, 'orders');
    const orderedQuery = query(orderRef, orderBy('sendTime'));

    return from(
      getDocs(orderedQuery).then((querySnapshot) => {
        const data: IOrder[] = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data() as IOrder);
          console.log(doc.id);
        });
        return data;
      })
    );
  }

  getCompletedOrders(): Observable<IOrder[]> {
    const completedOrderRef = collection(this.firestore, 'sent_orders');
    const completedQuery = query(completedOrderRef, orderBy('sendTime'));

    return from(
      getDocs(completedQuery).then((querySnapshot) => {
        const data: IOrder[] = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data() as IOrder);
        });
        return data;
      })
    );
  }

  async addOrder(orderData: IOrder) {
    const orderRef = doc(this.firestore, 'orders', orderData.id);
    await setDoc(orderRef, orderData);
  }

  async addCompletedOrder(orderData: IOrder) {
    const orderRef = doc(this.firestore, 'sent_orders', orderData.id);
    await setDoc(orderRef, orderData);
  }

  async deleteOrder(collectionName: string, orderData: IOrder) {
    const orderRef = collection(this.firestore, collectionName);
    const orderDeleteDoc = doc(orderRef, orderData.id);
    await deleteDoc(orderDeleteDoc);
  }

  async deleteCompletedOrder(collectionName: string, orderData: IOrder) {
    const completedOrderRef = collection(this.firestore, collectionName);
    const completedDeleteDoc = doc(completedOrderRef, orderData.id);
    await deleteDoc(completedDeleteDoc);
  }
}
