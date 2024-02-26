
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { ChartsService } from './../../services/services/charts.service';
import { TransactionResponse } from 'src/app/services/models';
import { Calender1Service } from '../calender1/calender1.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit, OnDestroy {
  currentPage: number = 1;
  itemsPerPage: number = 6;
  searchTerm: string = '';
  allUsers: TransactionResponse[] = [];
  allUsersStored:TransactionResponse[] = [];
  date1!:Date
  date2!:Date
  private dateSubscription: Subscription = new Subscription();

  constructor(
    private chartsService: ChartsService,

    private Calender1Service:Calender1Service,
    private toast:NgToastService
  ) {}

  ngOnInit(): void {
    // Subscribe to selected dates and update your data accordingly

   console.log("je suis dans le debut de ngOnInit 1")
    this.dateSubscription = this.Calender1Service.selectedDates$.subscribe((dates: Date[] | undefined) => {
      if (dates) {
        console.log("il y a de date selectionner "+dates.length)
        if (dates.length === 1) {
          this.date1 = dates[0];
          console.log("maintenat je veut travailler loadTrans avec une seul param")
          this.loadTrans(dates[0]);
        } else if (dates.length === 2) {

          this.date1 = dates[0];
          this.date2 = dates[1];
          this.loadTransactions(dates[0], dates[1]);
        }
      }else{
        console.log("ma3endich data haka 3elech manich ne5dem")
      }

    });




  }

  loadTransactions(startDate: Date, endDate: Date): void {
    const codeclient = localStorage.getItem('codeClient')as any as number;
    const formattedStartDate = startDate.toISOString(); // Or use any other format you need
    const formattedEndDate = endDate.toISOString();

    // Or use any other format you need

    this.chartsService.getTransctionsTransctionsCodeclientStartDateEndDateGet({
      codeclient,
      start_date: formattedStartDate,
      end_date: formattedEndDate
    }).subscribe(
      (response: any) => {
        if ( response.data.length!=0) {
          this.allUsers = response.data;
          this.allUsersStored=response.data;
          this.allUsers = this.allUsers.filter((transaction) =>
          transaction.articles.some(article =>
          article.ArticleName.toLowerCase().includes(this.searchTerm.toLowerCase()) ))
        } else {
          this.allUsers = []; // or handle empty response as needed
        }
      },
      (error) => {
        console.error('Error fetching transactions:', error);
      }
    );
  }

  loadTrans(startDate: Date): void {
    const codeclient = localStorage.getItem('codeClient')as any as number;

    const formattedStartDate = startDate.toISOString(); // Or use any other format you need


    // Or use any other format you need

    this.chartsService.getTransTransCodeclientStartDateGet({
      codeclient,
      start_date: formattedStartDate

    }).subscribe(
      (response: any) => {
        if (response.data.length!=0) {

          this.allUsersStored=response.data;
          this.allUsers = this.allUsers.filter((transaction) =>
          transaction.articles.some(article =>
            article.ArticleName.toLowerCase().includes(this.searchTerm.toLowerCase())
          ))
        } else {

          this.toast.info({
            type: 'info', // Add the type property
            detail: 'Error Message',
            summary: 'No transaction found for this client',
          });
        }
      },
      (error) => {
        console.error('Error fetching transactions:', error);
      }
    );
  }
















  onDatesChange(event: Event): void {
    // You may need to modify this line to extract the dates properly from your specific event object
    const dates: Date[] = (event as any).dates; // Replace this line with the correct logic to extract the dates
    if (dates && dates.length === 2) {
      this.loadTransactions(dates[0], dates[1]);
    } else if (dates && dates.length === 1) {
      this.loadTrans(dates[0]); // Call loadData1 with a single date
    }
  }











  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.dateSubscription.unsubscribe();
  }


  pageChanged(newPage: number) {
    this.currentPage = newPage;
  }

  updateItemsPerPage(value: string): void {
    this.itemsPerPage = parseInt(value, 10);
  }


  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const searchTerm = target.value.toLowerCase();

    // Filtrer les transactions en fonction du champ 'ArticleName'
    const filteredTransactions = this.allUsersStored.filter(trans => {
      const articleName = trans.articles.some(article =>
        article.ArticleName.toLowerCase().includes(searchTerm)
      );

      return articleName;
    });

    // Mettre à jour la liste des transactions avec les transactions filtrées
    this.allUsers = filteredTransactions;
  }




}
