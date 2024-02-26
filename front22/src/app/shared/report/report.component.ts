import { ChartsService } from './../../services/services/charts.service';
import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { jsPDF } from 'jspdf';
import { Subscription } from 'rxjs';
import { TopproResponse } from 'src/app/services/models';
import { Calender4Service } from '../calender4/calender4.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent  {
  topProducts: any[] | undefined;
  reportGenerated: boolean = false;

  selectedYear: any;
  produits: TopproResponse[] = [];
  private yearSubscription: Subscription = new Subscription();

  constructor(private router: Router,private ChartsService:ChartsService , private Calender4Service: Calender4Service) {
    this.yearSubscription = this.Calender4Service.getYear().subscribe((year) => {
      this.selectedYear = year;
    });

      const navigation = this.router.getCurrentNavigation();
      const options: NavigationExtras['state'] | undefined = navigation?.extras.state;

      if (options && options['includeTopProducts']) {
        this.getTopProducts();
      }

  }
  ngOnInit(): void {
    this.generateReport();

  }

  getTopProducts(): void {
    // Send an HTTP request to get the top products
    console.log("gggggggg")
    this.ChartsService.getTopproductsTopproYearGet({ year: this.selectedYear }).subscribe((Response) => {


        this.produits = Response.prods; // Fixed line
        console.log(this.produits)
        if (Array.isArray(this.produits) && this.produits.length > 0) {
          this.topProducts = this.produits;
        } else {
          console.warn('No Top Product was retrieved or the data is in the incorrect format.');
        }
      });
  }
  generateReport(): void {
    if (!Array.isArray(this.topProducts)) {
      console.log(this.topProducts)
      console.error('Les données des Top Produits sont absentes ou ne sont pas au format attendu.');
      return;
    }

    const doc = new jsPDF();

    doc.text('Rapport personnalisé', 10, 10);

    doc.text('Top Produits :', 10, 20);
    let yPosition = 30;
    this.topProducts.forEach((product: any, index: number) => {
      if (product && product.article) {
        doc.text(`${index + 1}. ${product.article}`, 20, yPosition);
        yPosition += 10;
      } else {
        console.warn(`Données incorrectes pour le Top Produit ${index + 1}.`);
      }
    });

    if (yPosition === 30) {
      console.warn('Aucun Top Produit valide n\'a été trouvé.');
      return;
    }

    this.reportGenerated = true; // Mettre à jour le drapeau après la génération du rapport
  }


  downloadReport(): void {
    if (!this.reportGenerated) {
      console.warn('Le rapport n\'a pas encore été généré.');
      return;
    }

    const doc = new jsPDF();

    doc.text('Rapport personnalisé', 10, 10);

    doc.text('Top Produits :', 10, 20);
    let yPosition = 30;

    if (this.topProducts && Array.isArray(this.topProducts)) {
      this.topProducts.forEach((product: any, index: number) => {
        if (product && product.article) {
          doc.text(`${index + 1}. ${product.article}`, 20, yPosition);
          yPosition += 10;
        } else {
          console.warn(`Données incorrectes pour le Top Produit ${index + 1}.`);
        }
      });
    }

    if (yPosition === 30) {
      console.warn('Aucun Top Produit valide n\'a été trouvé.');
      return;
    }

    doc.save('rapport.pdf');
  }
}
