export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
}
export interface IClient {
  id: string;
  name: string;
  surname: string;
}
export interface IInvoice {
  id: string;
  idProduct: string;
  idClient: string;
  discount: number;
  invoiceDate: Date;
  comment?: string;
}
