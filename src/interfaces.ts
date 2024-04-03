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
export interface IInvoice {
  id: number;
  idProduct: string;
  idClient: string;
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
