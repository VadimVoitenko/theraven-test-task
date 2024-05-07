import { CartItem } from './CartItem';
import { IOrderItems } from './IOrderItems';

export interface IOrder {
  name: string;
  surname: string;
  phone: string;
  address: string;
  items: IOrderItems[];
  totalCount: number;
  totalPrice: number;
}
