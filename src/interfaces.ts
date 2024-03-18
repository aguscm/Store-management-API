export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
}
export interface IClient {
  id: number;
  name: string;
  surname: string;
}
export interface IInvoice {
  id: number;
  idProduct: string;
  idClient: string;
  discount: number;
  date: Date;
  comment?: string;
}
