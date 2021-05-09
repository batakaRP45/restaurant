export interface IFoodCategory {
  food_category_img?: string,
  created_by?: string,
  id?: number,
  name?: string,
  isActivated?: boolean
}

export class FoodCategory implements IFoodCategory {
  constructor(
  public created_by?: string,
  public food_category_img?: string,
  public id?: number,
  public name?: string,
  public isActivated?: boolean
  ){
    isActivated = false;
  }
}
