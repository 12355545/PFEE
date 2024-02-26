import { ChartsService } from './../../services/services/charts.service';
import { Component, OnInit } from '@angular/core';
import { Calender4Service } from './calender4.service';
declare var $: any; // Declare the global jQuery variable

@Component({
  selector: 'app-calender4',
  templateUrl: './calender4.component.html',
  styleUrls: ['./calender4.component.css']
})
export class Calender4Component implements OnInit{
  database!:string;
  constructor(private Calender4Service:Calender4Service){}
  ngOnInit(): void {

    this.database=localStorage.getItem('database') as string as any;



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


    selectedYear: string = ''; // Initialize with the default year



    afficheParAnnee(year: string) {
      
      this.Calender4Service.setYear(year); // Call your service to set the selected year
    }

}







