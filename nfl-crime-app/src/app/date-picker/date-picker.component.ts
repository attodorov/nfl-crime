import { Component, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import { NfldataServiceService } from '../nfldata-service.service';
import { MatDatepicker, MatInput } from '@angular/material';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  @ViewChild("picker1") picker1: MatDatepicker<Date>;
  @ViewChild("picker2") picker2: MatDatepicker<Date>;

  public startDateDefault = new Date(1999, 0, 1);

  constructor(private nflDataService: NfldataServiceService, public datepipe: DatePipe) {

  }

  ngOnInit() {

  }

  clearDates() {
    this.nflDataService.startDate = null;
    this.nflDataService.endDate = null;
  }

  startDateChange(event: any) {
    this.nflDataService.startDate = this.datepipe.transform(event, 'yyyy-MM-dd');
  }
  endDateChange(event: any) {
    this.nflDataService.endDate = this.datepipe.transform(event, 'yyyy-MM-dd');
  }

  openStartPicker() {
    this.picker2.close();
    this.picker1.open();
  }
  openEndPicker() {
    this.picker1.close();
    this.picker2.open();
  }
}
