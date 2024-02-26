import { Component, OnInit } from '@angular/core';
import { DateSelectionService } from './calender.service';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit{
  selectedDate: any;

  constructor(private dateSelectionService: DateSelectionService) {}
  ngOnInit(): void {
  this.selectedDate = new Date('2017-01-01T00:00:00'); // Set the default date here
  this.dateSelectionService.setSelectedDate(this.selectedDate);
  }
  onDateChange(event: any) {
  this.selectedDate = event.value;
  this.dateSelectionService.setSelectedDate(this.selectedDate);
  }
}
