import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITableOrigin } from '../model/table-origin.model';
import { BASE_URL } from './../../app.constants';
import { createRequestOption } from '../util/request-util';

@Injectable({
  providedIn: 'root'
})
export class TableOriginService {

  constructor(protected http: HttpClient) { }

  getTableOrigin(): Observable<ITableOrigin[]>{
    return this.http.get<ITableOrigin[]>(BASE_URL+"api/get-table-origin");
  }

  getTableDisplay(req?: any): Observable<ITableOrigin[]>{
    return this.http.get<ITableOrigin[]>(BASE_URL+"api/get-table-display", {params: req});
  }
}
