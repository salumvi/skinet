import { IAddress } from "./address";

export interface IOrderToCreate {
    basketId: string;
    deliveryMethodId: number;
    shipToAddress: IAddress;
  }

  export interface IOrder {
    id: number;
    bayerEmail: string;
    orderDate: string;
    shipAddress: IAddress;
    deliveryMethod: string;
    orderItems: IOrderItem[];
    subtotal: number;
    shippingPrice: number;
    total: number;
    status: string;
  }
  
  export interface IOrderItem {
    productId: number;
    productName: string;
    pictureUrl: string;
    price: number;
    quantity: number;
  }