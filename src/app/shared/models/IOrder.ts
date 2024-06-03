import { IOrderItems } from './IOrderItems';

export interface IOrder {
  id: string;
  name: string;
  surname: string;
  phone: string;
  address: string;
  items: IOrderItems[];
  totalCount: number;
  totalPrice: number;
  sendTime: string;
}
