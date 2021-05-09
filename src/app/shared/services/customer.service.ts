import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BASE_URL } from '../../app.constants'
import { ICustomer } from './../model/customer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(protected http: HttpClient) { }

  createCustomer(customer: ICustomer): Observable<ICustomer>{
    return this.http.post<ICustomer>(BASE_URL+"api/save-customer", customer);
  }
}
