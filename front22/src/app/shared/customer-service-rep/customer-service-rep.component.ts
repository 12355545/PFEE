import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { TokenServiceService } from 'src/app/services/token-service/token-service.service';
import { SharedService } from '../shared.service';
import { number } from 'echarts';

@Component({
  selector: 'app-customer-service-rep',
  templateUrl: './customer-service-rep.component.html',
  styleUrls: ['./customer-service-rep.component.css']
})
export class CustomerServiceRepComponent implements OnInit, OnDestroy {
  selectedDiscount: number | undefined;

  showOverlay = false;
  private discountSubscription!: Subscription;

  constructor(
    private sharedDataService: SharedService,
    private TokenServiceService: TokenServiceService
  ) {}

  ngOnInit() {



    this.selectedDiscount=this.sharedDataService.getDiscount()
     // Subscribe to changes in the discount value

  }

  openOverlay() {
    this.showOverlay = true;
  }

  closeOverlay() {
    this.showOverlay = false;
  }

  ngOnDestroy() {
    // Unsubscribe from the discount value subscription to prevent memory leaks
    this.discountSubscription.unsubscribe();
  }
}
