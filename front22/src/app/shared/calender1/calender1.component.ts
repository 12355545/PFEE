import { ChartsService } from './../../services/services/charts.service';
import { Component, OnInit } from '@angular/core';
import { Calender1Service } from './calender1.service';
import { Subscription } from 'rxjs';
declare var $: any; // Declare the global jQuery variable
@Component({
  selector: 'app-calender1',
  templateUrl: './calender1.component.html',
  styleUrls: ['./calender1.component.css']
})
export class Calender1Component implements OnInit{

  database!:string;

  private dateSubscription: Subscription = new Subscription;
  constructor(private Calender1Service:Calender1Service){

  }
  ngOnInit(): void {
    this.database=localStorage.getItem('database') as string as any;
    this.dateSubscription = this.Calender1Service.getSelectedDates().subscribe(dates => {
      this.selectedDates = dates;
      console.log("the selected date est "+this.selectedDates)
    });
    // Initialize the Datepicker when the component is initialized
    $('#datepicker-input').datepicker({
    showButtonPanel: true,
    dateFormat: 'yy-mm-dd',
    changeMonth: true,
    changeYear: true,
    yearRange: 'c-100:c+10',
    dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    defaultDate: +7,
    buttonImageOnly: true,
    buttonImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAATCAYAAAB2pebxAAABGUlEQVQ4jc2UP06EQBjFfyCN3ZR2yxHwBGBCYUIhN1hqGrWj03KsiM3Y7p7AI8CeQI/ATbBgiE+gMlvsS8jM+97jy5s/mQCFszFQAQN1c2AJZzMgA3rqpgcYx5FQDAb4Ah6AFmdfNxp0QAp0OJvMUii2BDDUzS3w7s2KOcGd5+UsRDhbAo+AWfyU4GwnPAYG4XucTYOPt1PkG2SsYTbq2iT2X3ZFkVeeTChyA9wDN5uNi/x62TzaMD5t1DTdy7rsbPfnJNan0i24ejOcHUPOgLM0CSTuyY+pzAH2wFG46jugupw9mZczSORl/BZ4Fq56ArTzPYn5vUA6h/XNVX03DZe0J59Maxsk7iCeBPgWrroB4sA/LiX/R/8DOHhi5y8Apx4AAAAASUVORK5CYII=',
    buttonText: 'Pick Date',
    showOn: 'button'
    });

    $('#datepicker-div').datepicker({
    dateFormat: 'dd/mm/yy',
    yearRange: 'c-100:c+10',
    dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    });

    $('#datepicker-input').datepicker('setDate', '10/12/2012');
    }
    selectedYear: string = '';
    selectedDates: Date[] = [];

    afficheParAnnnee(year: any) {
      this.selectedDates = [];
      this.Calender1Service.setYear(year);
    }


    onDateChange(event: any) {
      const selectedDate = event.value;
     if(this.selectedDates.indexOf(selectedDate)==-1)
     {
      this.selectedDates.push(selectedDate)
     }
     this.selectedYear = ''; // Clear the selected year when a date is chosen
      this.Calender1Service.setSelectedDates(this.selectedDates);
    }

  }



