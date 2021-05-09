export interface IFood {
  created_at?: Date,
  created_by?: string,
  description?: string,
  foodCategoryId?: number,
  food_img?: string,
  food_last_vote?: number,
  food_vote_quantity?: number,
  id?: number,
  name?: string,
  price?: number,
  rate?: number
}

export class Food implements IFood {
  constructor(
  public created_at?: Date,
  public created_by?: string,
  public description?: string,
  public foodCategoryId?: number,
  public food_img?: string,
  public food_last_vote?: number,
  public food_vote_quantity?: number,
  public id?: number,
  public name?: string,
  public price?: number,
  public rate?: number
  ){

  }
}
