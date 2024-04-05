export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  imagePath: string;
}
export interface IClient {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone?: string;
  registration_date: Date;
}
export interface IInvoiceShort {
  id: number;
  idProduct: number;
  idClient: number;
  discount: number;
  date: Date;
  comment?: string;
}

export interface IInvoice {
  id: number;
  product: IProduct;
  client: IClient;
  discount: number;
  date: Date;
  comment?: string;
}
export interface IUser {
  tokenId: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
}
export interface IResponse {
  error: boolean;
  code: number;
  message?: string;
  data?: Object;
}
