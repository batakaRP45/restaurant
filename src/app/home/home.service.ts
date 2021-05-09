import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IFood } from '../shared/model/food.model';
import { BASE_URL } from '../app.constants'
import { Observable } from 'rxjs';
import { createRequestOption } from '../shared/util/request-util';
import { IFoodCategory } from './../shared/model/food-category.model';

type EntityResponseType = HttpResponse<IFood>;
type EntityArrayResponseType = HttpResponse<IFood[]>;

@Injectable({
  providedIn: 'root'
})

export class HomeService {
  constructor(protected http: HttpClient) {}

  getAllFood(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFood[]>(BASE_URL+"api/get-food", { params: options, observe: 'response' });
  }

  searchFood(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFood[]>(BASE_URL+"api/search-food", { params: options, observe: 'response' });
  }

  countAllFood(): Observable<number> {
    return this.http.get<number>(BASE_URL+"api/count-all");
  }

  countSearchFood(search: unknown): Observable<number> {
    return this.http.get<number>(BASE_URL+"api/count-search/" + search);
  }

  getAllCategory(): Observable<IFoodCategory[]> {
    return this.http.get<IFoodCategory[]>(BASE_URL+"api/get-category");
  }

  countFoodCategory(id: number): Observable<number> {
    return this.http.get<number>(BASE_URL+"api/count-food-category/" + id);
  }

  getFoodCategoryById(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFood[]>(BASE_URL+"api/find-food-by-category", { params: options, observe: 'response' });
  }
}
