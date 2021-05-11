import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BASE_URL } from '../../app.constants'
import { ICustomer } from './../model/customer.model';
import { Observable } from 'rxjs';
import { createRequestOption } from '../util/request-util';

type EntityArrayResponseType = HttpResponse<ICustomer[]>;
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(protected http: HttpClient) { }

  createCustomer(customer: ICustomer): Observable<ICustomer>{
    return this.http.post<ICustomer>(BASE_URL+"api/save-customer", customer);
  }

  searchCustomer(req?: any): Observable<EntityArrayResponseType>{
    const options = createRequestOption(req);
    return this.http.get<ICustomer[]>(BASE_URL+"api/search-customer", { params: options, observe: 'response' });
  }

  getAllCustomer(req?: any): Observable<EntityArrayResponseType>{
    const options = createRequestOption(req);
    return this.http.get<ICustomer[]>(BASE_URL+"api/get-customer", { params: options, observe: 'response' });
  }

  countAllCustomer(): Observable<number>{
    return this.http.get<number>(BASE_URL+"api/count-all-customer");
  }

  countSearchCustomer(search: unknown): Observable<number>{
    return this.http.get<number>(BASE_URL+"api/count-search-customer/"+search);
  }
}
