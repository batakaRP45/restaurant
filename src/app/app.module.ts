import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoadingComponent } from './loading/loading.component';
import { HomeComponent } from './home/home.component';
import { HomeService } from './home/home.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookTableComponent } from './modal/book-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BookingCalendarComponent } from './admin/booking-calendar/booking-calendar.component';
import { CustomerComponent } from './admin/customer/customer.component';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    HomeComponent,
    BookTableComponent,
    BookingCalendarComponent,
    CustomerComponent
  ],
  imports: [
  BrowserModule,
  HttpClientModule,
  NgbModule,
  FormsModule,
  ReactiveFormsModule,
  FullCalendarModule,
  BrowserAnimationsModule,
  ToastrModule.forRoot({
    timeOut: 2000,
    positionClass: 'toast-top-right'
  })
  ],
  providers: [HomeService],
  bootstrap: [AppComponent, HomeComponent]
})
export class AppModule { }
