import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FEILD_DEFAULT, SORT_DEFAULT } from 'src/app/app.constants';
import { ICustomer } from './../../shared/model/customer.model';
import { ITEMSPERPAGE } from './../../app.constants';
import { CustomerService } from './../../shared/services/customer.service';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, pluck } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit, AfterViewInit {

  customers: ICustomer[] | null = null;
  feild: string = FEILD_DEFAULT;
  sort: string = SORT_DEFAULT;
  ngbPaginationPage = 1;
  itemsPerPage: number = ITEMSPERPAGE;
  totalItems = 0;
  page!: number;
  key!: unknown;
  @ViewChild('search') toTarget!: ElementRef;

  constructor(
    private customerService: CustomerService,
    private activeModal: NgbActiveModal
  ) { }
  ngAfterViewInit(): void {
    fromEvent(this.toTarget.nativeElement, 'input')
      .pipe(
        debounceTime(500),
        pluck('target', 'value'),
        distinctUntilChanged(),
        map(value => value)
      )
      .subscribe(value => {this.key=value;this.loadPage(value)});
  }

  ngOnInit(): void {
    this.loadPage(this.key);
  }

  loadPage(keyword: unknown, page?: number, dontNavigate?: boolean): void {
    const pageToLoad: number = page || this.page || 1;

    if (keyword) {
      this.customerService.countSearchCustomer(keyword).subscribe((res: number) => this.totalItems = res);
      this.customerService
        .searchCustomer({
          feild: this.feild,
          page: pageToLoad - 1,
          search: keyword,
          size: this.itemsPerPage,
          sort: this.sort,
        })
        .subscribe(
          (res: HttpResponse<ICustomer[]>) => this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate),
          () => this.onError()
        );
    } else {
      this.customerService.countAllCustomer().subscribe((res: number) => this.totalItems = res);
      this.customerService
        .getAllCustomer({
          feild: this.feild,
          page: pageToLoad - 1,
          search: keyword,
          size: this.itemsPerPage,
          sort: this.sort,
        })
        .subscribe(
          (res: HttpResponse<ICustomer[]>) => this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate),
          () => this.onError()
        );
    }
  }

  protected onSuccess(data: ICustomer[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    //this.totalItems = Number(headers.getAll('x-total-count'));
    this.page = page;
    // if (navigate) {
    //   this.router.navigate(['/get-food'], {
    //     queryParams: {
    //       page: this.page,
    //       size: this.itemsPerPage,
    //       sort: "ASC",
    //     },
    //   });
    // }
    this.customers = data || [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

}
