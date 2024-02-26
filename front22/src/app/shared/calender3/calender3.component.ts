import { Calender1Service } from './../calender1/calender1.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateSelectionService } from './calender3.service';

@Component({
  selector: 'app-calender3',
  templateUrl: './calender3.component.html',
  styleUrls: ['./calender3.component.css'],
})
export class Calender3Component implements OnInit {

  selectedDates: Date[] = [];
  selectdefaultdates: any;

  constructor(private dateSelectionService: DateSelectionService,private Calender1Service: Calender1Service) {}

  ngOnInit(): void {
    // Set one or two default dates here
    this.selectdefaultdates = this.Calender1Service.getSelectedDates()
    this.selectedDates = [];
    this.dateSelectionService.setSelectedDates(this.selectedDates);
  }
  onDateChange(event: any) {
    const selectedDate = event.value;
   if(this.selectedDates.indexOf(selectedDate)==-1)
   {
    this.selectedDates.push(selectedDate)
   }

    this.dateSelectionService.setSelectedDates(this.selectedDates);
  }


}
