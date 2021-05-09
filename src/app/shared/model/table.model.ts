import { ICustomer } from "./customer.model";
import { ITableOrigin } from "./table-origin.model";

export interface ITable {
  customer?: ICustomer,
  customId?: number,
  tableId?: number,
  id?: number,
  status?: boolean,
  tableOrigin?: ITableOrigin,
  timeBooking?: Date,
  timeCreated?: Date
}

export class Table implements ITable {
  constructor(
  public customer?: ICustomer,
  public customId?: number,
  public tableId?: number,
  public id?: number,
  public status?: boolean,
  public tableOrigin?: ITableOrigin,
  public timeBooking?: Date,
  public timeCreated?: Date
  ){

  }
}
