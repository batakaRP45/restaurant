import { Component, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer, ICustomer } from '../shared/model/customer.model';
import { ITable, Table } from '../shared/model/table.model';
import { TableOriginService } from '../shared/services/table-origin.service';
import { ITableOrigin } from './../shared/model/table-origin.model';
import { TableService } from './../shared/services/table.service';
import { CustomerService } from './../shared/services/customer.service';
import { DATE } from '../shared/util/datepicker-adapter';
import { ToastrService } from 'ngx-toastr';
import { ERROR, SUCCESSFUL, VALIDATE } from '../app.constants';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.css']
})
export class BookTableComponent implements OnInit, AfterViewInit, OnChanges {
  table: ITable | null = null;
  customer: ICustomer | null = null;
  tableOrigins: ITableOrigin[] | null = null;

  dateTime: {year: number, month: number, day: number} | null = null;

  createForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    email: [null, [Validators.email]],
    phone_number: [null, [Validators.required, Validators.pattern("^((\\+84-?)|0)?[0-9]{10}$")]],
    address: [],
    date_booking: [null, [Validators.required]],
    time_booking: [null, [Validators.required]],
    people_quantity: [null, [Validators.required]]
  });

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private tableOriginService: TableOriginService,
    private tableService: TableService,
    private customerService: CustomerService,
    private toastService: ToastrService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngAfterViewInit(): void {
  }

    //Support access feild in form
  get f() { return this.createForm.controls; }

  ngOnInit(): void {
    this.tableOriginService.getTableOrigin().subscribe((res: ITableOrigin[]) => this.tableOrigins = res);
  }

  loadTableOrigin(status: boolean, date: string) {
    this.tableOriginService.getTableDisplay({
      date: date,
      status: status
    }).subscribe((res: ITableOrigin[]) => this.tableOrigins = res);
  }

  getTable(): void {
    if(!this.f.date_booking.errors && !this.f.time_booking.errors) {
      this.f.people_quantity.reset();
      this.dateTime = this.createForm.get(['date_booking'])!.value;
      this.loadTableOrigin(true, this.dateTime.year + "-" + (this.dateTime.month<10?("0"+this.dateTime.month):this.dateTime.month) + "-" + (this.dateTime.day<10?("0"+this.dateTime.day):this.dateTime.day));
    }
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  findPeopleQuantity(quantity: number): ITableOrigin[]{
    if(this.tableOrigins == null){
      return null;
    }else{
    if(quantity < 5){
          return this.tableOrigins.filter((val) => val.peopleQuantity == quantity);
        }else{
          return this.tableOrigins.filter((val) => val.peopleQuantity >= quantity);
      }
    }
  }

  private createFromForm(user: number): void {
    this.dateTime = this.createForm.get(['date_booking'])!.value;
    this.table = {
      ...new Table(),
      id: 200,
      customId: user + 1,
      status: true,
      tableId: this.createForm.get(['people_quantity'])!.value,
      timeBooking: new Date(this.dateTime.year + "-" + this.dateTime.month + "-" + this.dateTime.day),
      timeCreated: new Date(DATE)
    };
  }

  private createCustomer(): void {
    this.customer = {
      ...new Customer(),
      id: 200,
      address: this.createForm.get(['address'])!.value,
      email: this.createForm.get(['email'])!.value,
      name: this.createForm.get(['name'])!.value,
      phone_number: this.createForm.get(['phone_number'])!.value,
      tableId: this.createForm.get(['people_quantity'])!.value
    }
  }

  submitForm(userId: number): void {
    for (const i in this.createForm.controls) {
      if (Object.prototype.hasOwnProperty.call(this.createForm.controls, i)) {
        this.createForm.controls[i].markAsDirty();
        this.createForm.controls[i].updateValueAndValidity();
        //console.log(this.createForm.controls[i].value);
      }
    }
    if (this.createForm.valid) {
      this.createFromForm(userId);
      if (this.table) {
        this.tableService.createTable(this.table).subscribe(
          () => {
            this.toastService.success(SUCCESSFUL);
            this.cancel();
          },
          () => {
            this.toastService.error(ERROR);
          }
        );
      }
    }
  }

  submitFormForm(): void {
    for (const i in this.createForm.controls) {
      if (Object.prototype.hasOwnProperty.call(this.createForm.controls, i)) {
        this.createForm.controls[i].markAsDirty();
        this.createForm.controls[i].updateValueAndValidity();
        //console.log(this.createForm.controls[i].value);
      }
    }
    if (this.createForm.valid) {
      this.createCustomer();
      if (this.customer) {
        this.customerService.createCustomer(this.customer).subscribe(
          (res: ICustomer) => this.submitForm(res.id)
        );
      }
    } else {
      this.toastService.warning(VALIDATE);
    }
  }
}
