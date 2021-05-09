import { ITable } from "./table.model";

export interface ICustomer {
  address?: string,
  email?: string,
  id?: number,
  login_name?: string,
  name?: string,
  phone_number?: string,
  tableId?: number,
  table?: ITable
}

export class Customer implements ICustomer {
  constructor(
  public  address?: string,
  public email?: string,
  public id?: number,
  public login_name?: string,
  public name?: string,
  public phone_number?: string,
  public tableId?: number,
  public table?: ITable
  ){

  }
}
