import { jsPDF } from 'jspdf';

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DateSelectionService } from '../calender/calender.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { ChartsService } from 'src/app/services/services';
import { EcartResponse, RevenueResponse, TopPayResponse, TopRegionResponse, TopclResponse, TopproResponse } from 'src/app/services/models';
import { Observable, Subscription, forkJoin } from 'rxjs';
import { Calender4Service } from '../calender4/calender4.service';
import { Router } from '@angular/router';

import { TokenServiceService } from 'src/app/services/token-service/token-service.service';
import { Dashborad2Service } from './dashborad2.service';
import { DatabaseSelectionServiceService } from '../home/database-selection-service.service';


@Component({
  selector: 'app-dashborad2',
  templateUrl: './dashborad2.component.html',
  styleUrls: ['./dashborad2.component.css']
})
export class Dashborad2Component implements OnInit{







 years!: string[];

// Check the value in localStorage

  isChecked: { [key: string]: boolean } = {};
  selectedyears: string[] = [];

  choix: string[] = ["month", "quarter"]; // Your list of dates
  Checked: { [key: string]: boolean } = {};
  selectedchoix: string[] = [];


  topProducts: any[] | undefined;
  topcustomer :any[] | undefined;
  revenueData :any[] | undefined
  reportGenerated: boolean = false;
  private dateSubscription: Subscription = new Subscription();
  selectedYear: any;
  private yearSubscription: Subscription = new Subscription();
  clients: TopclResponse[] = [];
  produits: TopproResponse[] = [];
  revenue : RevenueResponse []=[];
  regions :TopRegionResponse [] = [];

  displayCardDetails !: boolean;
  options = {
    includeTopCustomers: false,
    includeTopProducts: false,

    includeSalesoveryear :false,
    includeSalesByregion :false,
    includeTopGlobalsales :false
  };
  gouvernorat: any[] | undefined;
  pays: TopPayResponse[] =[];
  state: any[] | undefined;
  role_name!: string;
  ecart: EcartResponse[] | undefined;
  ecartData: any[] = [];
  yearsSubscription: any;

  concatenatedText: SafeHtml = '';
  constructor(
    private sanitizer: DomSanitizer,
    private dateSelectionService: DateSelectionService,
    private Calender4Service: Calender4Service,
    private datePipe: DatePipe,
    private dashboard1Service :Dashborad2Service,
    private TokenServiceService :TokenServiceService,
    private ChartsService: ChartsService,
    private http: HttpClient,
    private DatabaseSelection:DatabaseSelectionServiceService,
    private router: Router
  ) {


  }

  ngOnInit(): void {
    this.role_name=this.TokenServiceService.userRole;
    if (localStorage.getItem('database') === 'PFE') {
      this.years = ["2017", "2018"];
    } else if(localStorage.getItem('database') === 'PFE_GIPA'){
      this.years = ["2019", "2020", "2021", "2022"];
    }else
    {
      this.years = ["2017", "2018", "2019", "2020", "2021", "2022"];
    }
    this.yearSubscription = this.Calender4Service.getYear().subscribe((year) => {
      this.selectedYear = year;

      this.load1();
      this.load2();
    });

this.dashboard1Service.GetSelectedyearsObservable().subscribe((list) => {
  this.getEcart();
})
  }
  load1() {
    this.ChartsService.getComparaisonClYearGet({ year: this.selectedYear }).subscribe((Response) => {
      this.clients = Response.cls; // Assign to component's clients property
      console.log(this.clients); // For debugging, check the console for the values
    });
  }
  showCardDetails() {
    this.displayCardDetails = true;
  }
  hideCardDetails() {
    this.displayCardDetails = false;

  }
  getTopProducts(): Observable<any> {
    return this.ChartsService.getTopproductsTopproYearGet({ year: this.selectedYear });
  }

  getTopCustomer(): Observable<any> {
    return this.ChartsService.getComparaisonClYearGet({ year: this.selectedYear });
  }

  getsalesoveryear(): Observable<any> {
    return this.ChartsService.getTotalrevenueTotalrevenueYearGet$Response({ year1: this.selectedYear });
  }

  getsalesbyregion(): Observable<any> {
    return this.ChartsService.getRegionRegYearGet$Response({ year: this.selectedYear });
  }

  getsalesbypays(): Observable<any> {
    return this.ChartsService.getGlobalsalesGlobalsalesYearGet$Response({ year: this.selectedYear });
  }

  getEcart(): void {
    const list = this.dashboard1Service.Getselectedyears();
    console.log(list);
    const yearString = list.join(', ');

    this.ChartsService.calculateEcartTypeEcarttypeListyearGet({ listyear: yearString }).subscribe(
      (response) => {
        console.log("on affiche le response " + response);
        console.log("ici le response.ecrat " + response.ecart);
        this.ecartData = response.ecart;
        console.log("on affiche ecratData" + this.ecartData);

        // Initialize the variable before the loop
        let htmlContent = '';

        for (let i = 0; i < this.ecartData.length; i++) {
          const data = this.ecartData[i];
          const bgColor = this.getColorForEcartType(data.ecart_type, i);

          // Format the number to two decimal places
          const formattedVariance = data.ecart_type.toFixed(2);

          // Create a colored circle with the specified background color and formatted variance value
          htmlContent += `<div class="point-warning" style="background-color: ${bgColor}; width: 15px; height: 15px; border-radius: 50%; display: inline-block;"></div> ${formattedVariance} `;
        }

        // Display "Ecart Type" before the variance values
        htmlContent = `<strong>Standard deviation:</strong> ${htmlContent}`;

        // Reset htmlContent for the next loop
        htmlContent += ' <strong>Variance:</strong> ';

        for (let i = 0; i < this.ecartData.length; i++) {
          const data = this.ecartData[i];
          const bgColor = this.getColorForEcartType(data.ecart_type, i);

          // Format the number to two decimal places
          const formattedEcartType = data.variance.toFixed(2);

          // Create a colored circle with the specified background color and formatted ecart_type value
          htmlContent += `<div class="point-warning" style="background-color: ${bgColor}; width: 15px; height: 15px; border-radius: 50%; display: inline-block;"></div> ${formattedEcartType} `;
        }

        // Sanitize and assign to concatenatedText
        this.concatenatedText = this.sanitizer.bypassSecurityTrustHtml(htmlContent);
      }
    );
  }




  onSubmit(): void {
    this.displayCardDetails = false;
    this.downloadReport();
  }

  downloadReport(): void {
    forkJoin({
      produits: this.getTopProducts(),
      clients: this.getTopCustomer(),
      revenue: this.getsalesoveryear(),
      regions: this.getsalesbyregion(),
      pays: this.getsalesbypays(),
    }).subscribe((responses) => {
      this.topProducts = responses.produits.prods;
      this.topcustomer = responses.clients.cls;
      this.revenueData = responses.revenue.body.rev;
      this.gouvernorat = responses.regions.body.regions;
      this.state = responses.pays.body.pays;

    const doc = new jsPDF();
//if(this.DatabaseSelection.getDatabase()=='PFE_GIPA')
if(localStorage.getItem('database') === 'PFE_GIPA')
{
  console.log("the selected data base est"+this.DatabaseSelection.getDatabase())
  doc.addImage('../assets/img/gipa.png', 'PNG', 10, 10, 60, 30, undefined, 'NONE');

}
else {
  console.log("the selected data base est"+this.DatabaseSelection.getDatabase())
  doc.addImage('../assets/img/mazraa.png', 'PNG', 10, 10, 60, 30, undefined, 'NONE');
}
    // Adjust the yPosition to start below the image
let yPosition = 30;

// Set global font style to 'Helvetica' and color to black
doc.setFont("Helvetica");
doc.setTextColor(0, 0, 0); // Black

// Stylize and add Report Title
doc.setFontSize(18);
doc.text('Annual Report', 70, yPosition);

// Add a separator line below the title
yPosition += 10;
doc.line(10, yPosition, 200, yPosition);

yPosition += 10;

// Function to handle common styling and separator
const handleSection = (title: string) => {
  doc.setFontSize(14);  // Font size for sub-titles
  doc.setTextColor(255, 0, 0); // RGB values for red.
  doc.text(title, 10, yPosition);
  yPosition += 10;
  doc.setTextColor(0, 0, 0); // Resetting color to black after printing title
};




    if ( this.options.includeTopProducts && this.topProducts && Array.isArray(this.topProducts)) {
      handleSection('Top Products:');


      this.topProducts.forEach((product: any, index: number) => {
        if (yPosition > 280) {
          doc.addPage();
          yPosition = 10;
        }
        if (product && product.article) {
          doc.text(`${index + 1}. ${product.article}`, 20, yPosition);
          yPosition += 10;
        } else {
          console.warn(`Incorrect data for top product ${index + 1}.`);
        }
      });
      yPosition += 5;
      doc.line(10, yPosition, 200, yPosition);
      yPosition += 10;
    }

    // Top Customers
    if (this.options.includeTopCustomers && this.topcustomer && Array.isArray(this.topcustomer)){


      if (yPosition > 280) {
        doc.addPage();
        yPosition = 10;
      }
      handleSection('Top Customers:');

      yPosition += 10;

      this.topcustomer.forEach((customer: any, index: number) => {
        if (yPosition > 280) {
          doc.addPage();
          yPosition = 10;
        }
        if (customer && customer.Client) {
          doc.text(`${index + 1}. ${customer.Client}`, 20, yPosition);
          yPosition += 10;
        } else {
          console.warn(`Incorrect data for top customer ${index + 1}.`);
        }
      });
      yPosition += 5;
      doc.line(10, yPosition, 200, yPosition);
      yPosition += 10;
    }

    // Sales Each Month
    if (this.options.includeSalesoveryear && this.revenueData && Array.isArray(this.revenueData)){

      if (yPosition > 280) {
        doc.addPage();
        yPosition = 10;
      }
      handleSection('Sales each month:');
      yPosition += 10;

      this.revenueData.forEach((revenue: any, index: number) => {
        if (yPosition > 280) {
          doc.addPage();
          yPosition = 10;
        }
        if (revenue && revenue.total_revenue_N) {
          doc.text(`${index + 1}.${revenue.month}: ${revenue.total_revenue_N}`, 20, yPosition);
          yPosition += 10;
        } else {
          console.warn(`Incorrect data for sales each month ${index + 1}.`);
        }
      });
      yPosition += 5;
      doc.line(10, yPosition, 200, yPosition);
      yPosition += 10;
    }

    // Sales by Region
    if (this.options.includeSalesByregion && this.gouvernorat && Array.isArray(this.gouvernorat)){

      if (yPosition > 280) {
        doc.addPage();
        yPosition = 10;
      }
      handleSection('Sales By region:');
      yPosition += 10;

      this.gouvernorat.forEach((gouvernorat: any, index: number) => {
        if (yPosition > 280) {
          doc.addPage();
          yPosition = 10;
        }
        if (gouvernorat && gouvernorat.TotalRevenue) {
          doc.text(`${index + 1}.${gouvernorat. gouvernorat} : ${gouvernorat.TotalRevenue}`, 20, yPosition);
          yPosition += 10;
        } else {
          console.warn(`Incorrect data for sales by region ${index + 1}.`);
        }
      });
      yPosition += 5;
      doc.line(10, yPosition, 200, yPosition);
      yPosition += 10;
    }

    // Sales by State
    if (this.options.includeTopGlobalsales && this.state && Array.isArray(this.state)){

      if (yPosition > 280) {
        doc.addPage();
        yPosition = 10;
      }
      handleSection('Sales By pays:');
      yPosition += 10;

      this.state.forEach((state: any, index: number) => {
        if (yPosition > 280) {
          doc.addPage();
          yPosition = 10;
        }
        if (state && state.ventes_totales) {
          doc.text(`${index + 1}.${state.pays} : ${state.ventes_totales}`, 20, yPosition);
          yPosition += 10;
        } else {
          console.warn(`Incorrect data for sales by state ${index + 1}.`);
        }
      });
      yPosition += 5;
      doc.line(10, yPosition, 200, yPosition);
      yPosition += 10;
    }
    if (yPosition === 30) {
      console.warn('Aucun data valide n\'a été trouvé.');
      return;
    }

    doc.save('rapport.pdf');

  });
}

  load2() {
    this.ChartsService.getTopproductsTopproYearGet({ year: this.selectedYear }).subscribe((Response) => {
      this.produits = Response.prods; // Assign to component's produits property
      console.log(this.produits); // For debugging, check the console for the values
    });
  }
  updateSelectedyears(event: any) {
    const year = event.target.value;
    this.isChecked[year] = event.target.checked;
    this.selectedyears = this.years.filter(year => this.isChecked[year]);
    // Set the selected years in your service
  this.dashboard1Service.Setselectedyears(this.selectedyears);
  }


  updateSelectedchoix(event: any) {
    const choi = event.target.value;
    this.Checked[choi] = event.target.checked;
    this.selectedchoix = this.choix.filter(choi => this.Checked[choi]);
    // Set the selected choices in your service
  this.dashboard1Service.Setselectedchoix(this.selectedchoix);
  }





  getColorForEcartType(ecartType: string, index: number): string {
    const colors: string[] = [
      '#56A874', // 1st color
      '#FF5733', // 2nd color
      '#337DFF', // 3rd color
      '#FF337D'
      // Add more colors as needed
    ];

    // Use the index to select the color dynamically
    const color = colors[index] || '#000'; // Default to black if no matching color is found
    return color;
  }







}
