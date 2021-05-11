import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { TableService } from 'src/app/shared/services/table.service';
import { ITable } from './../../shared/model/table.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-booking-calendar',
  templateUrl: './booking-calendar.component.html',
  styleUrls: ['./booking-calendar.component.css']
})
export class BookingCalendarComponent implements OnInit {
  tables: ITable[] | null = null;
  listDate: any = [];
  calendarOptions: CalendarOptions;
  handleDateClick(arg) {
    alert(arg.dateStr);
  }
  constructor(
    private tableService: TableService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.loadPage(true);
  }

  loadPage(status: boolean){
    this.tableService.getTableForCalendar(status).subscribe((res: ITable[]) => {
      this.tables = res;
      setTimeout(()=> {
        this.setOptions();
        this.calendarOptions = {
          initialView: 'dayGridMonth',
          dateClick: this.handleDateClick.bind(this),
          events: this.listDate
        };}, 200)
    });
  }

  setOptions(){
    this.tables.forEach((tables: ITable)=>{
      this.listDate.push({
        title: "Bàn mã: "+tables.tableId+" - "+"Khách: "+tables.customId,
        date: tables.timeBooking
      })
    })
  }

  cancel(): void {
    this.activeModal.close();
  }

}
