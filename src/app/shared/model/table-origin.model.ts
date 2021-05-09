
export interface ITableOrigin {
  id?: number,
  position?: number,
  peopleQuantity?: number,
}

export class TableOrigin implements ITableOrigin {
  constructor(
  public id?: number,
  public position?: number,
  public peopleQuantity?: number,
  ){

  }
}
