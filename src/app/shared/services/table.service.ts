import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ITable } from './../model/table.model';
import { Observable } from 'rxjs';
import { BASE_URL } from './../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(protected http: HttpClient) { }

  createTable(table: ITable): Observable<ITable>{
    return this.http.post<ITable>(BASE_URL+"api/post-table", table);
  }

  getTableForCalendar(status: boolean): Observable<ITable[]>{
    return this.http.get<ITable[]>(BASE_URL+"api/get-all-table-for-calendar/"+status);
  }
}
