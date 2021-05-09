import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IFood } from '../shared/model/food.model';
import { HomeService } from './home.service';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { map, debounceTime, pluck, distinctUntilChanged } from 'rxjs/operators';
import { FEILD_DEFAULT, SORT_DEFAULT, ITEMSPERPAGE } from '../app.constants';
import { IFoodCategory } from './../shared/model/food-category.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookTableComponent } from '../modal/book-table.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  foods: IFood[] | null = null;
  foodCategorys: IFoodCategory[] | null = null;
  feild: string = FEILD_DEFAULT;
  sort: string = SORT_DEFAULT;
  ngbPaginationPage = 1;
  itemsPerPage: number = ITEMSPERPAGE;
  totalItems = 0;
  page!: number;
  images: any = ["https://graphicsfamily.com/wp-content/uploads/edd/2020/11/Tasty-Food-Web-Banner-Design-scaled.jpg", "https://elements-cover-images-0.imgix.net/b7baf8c8-ba17-4e35-9865-0fdeb552e7cf?auto=compress&crop=edges&fit=crop&fm=jpeg&h=630&w=1200&s=beffa2284fb0f3a624c1949831af34d7", "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/3bb51c97376281.5ec3ca8c1e8c5.jpg", "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/45b7de97376281.5ec3ca8c1d324.jpg"];
  key!: string;
  @ViewChild('search') toTarget!: ElementRef;

  constructor(
    protected homeService: HomeService,
    private modalService: NgbModal,
  ) { }

  ngAfterViewInit(): void {
    fromEvent(this.toTarget.nativeElement, 'input')
      .pipe(
        debounceTime(500),
        pluck('target', 'value'),
        distinctUntilChanged(),
        map(value => value)
      )
      .subscribe(value => {this.loadPage(value);this.loadCategory()});
  }

  ngOnInit(): void {
    this.loadCategory();
    this.loadPage(this.key);
  }

  loadCategory(): void {
    this.homeService.getAllCategory().subscribe((res: IFoodCategory[]) => {
      this.foodCategorys = res;
      this.foodCategorys.forEach((value: IFoodCategory, index) => index>0?value.isActivated=false:value.isActivated=true);
    });
  }

  loadPage(keyword: unknown, page?: number, dontNavigate?: boolean): void {
    const pageToLoad: number = page || this.page || 1;

    if (keyword) {
      this.homeService.countSearchFood(keyword).subscribe((res: number) => this.totalItems = res);
      this.homeService
        .searchFood({
          feild: this.feild,
          page: pageToLoad - 1,
          search: keyword,
          size: this.itemsPerPage,
          sort: this.sort,
        })
        .subscribe(
          (res: HttpResponse<IFood[]>) => this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate),
          () => this.onError()
        );
    } else {
      this.homeService.countAllFood().subscribe((res: number) => this.totalItems = res);
      this.homeService
        .getAllFood({
          feild: this.feild,
          page: pageToLoad - 1,
          search: keyword,
          size: this.itemsPerPage,
          sort: this.sort,
        })
        .subscribe(
          (res: HttpResponse<IFood[]>) => this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate),
          () => this.onError()
        );
    }
  }

  loadPageCategory(id: number, page?: number, dontNavigate?: boolean): void {
    const pageToLoad: number = page || this.page || 1;
    this.homeService.countFoodCategory(id).subscribe((res: number) => this.totalItems = res);
    this.homeService.getFoodCategoryById({
          feild: this.feild,
          page: pageToLoad - 1,
          category_id: id,
          size: this.itemsPerPage,
          sort: this.sort,
    }).subscribe(
      (res: HttpResponse<IFood[]>) => this.onSuccessCategoryId(res.body, res.headers, pageToLoad, !dontNavigate),
      () => this.onError()
    )
  }

  protected onSuccess(data: IFood[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
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
    this.foods = data || [];
    this.ngbPaginationPage = this.page;
  }

  protected onSuccessCategoryId(data: IFood[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.page = page;
    this.foods = data || [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }

  setActivated(index: number): void {
    this.key = "";
    this.foodCategorys.forEach((value: IFoodCategory, i) => i==index?value.isActivated=true:value.isActivated=false);
    this.foodCategorys[index].id!=9?this.loadPageCategory(this.foodCategorys[index].id):this.loadPage(this.key);
  }

  openBooking(): void {
    this.modalService.open(BookTableComponent, {size: 'lg', backdrop: 'static', windowClass: 'book-table.component'});
  }
}

