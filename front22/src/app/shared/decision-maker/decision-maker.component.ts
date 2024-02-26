 // decision-maker.component.ts
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-decision-maker',
  templateUrl: './decision-maker.component.html',
  styleUrls: ['./decision-maker.component.css']
})
export class DecisionMakerComponent implements OnInit {
  selectedDiscount!: number ;
  showOverlay = false;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {

  }

  openOverlay() {
    this.showOverlay = true;
  }

  closeOverlay() {
    this.showOverlay = false;
  }

  applyDiscount() {
    // Handle the selected discount
    console.log('Selected Discount (Decision Maker):', this.selectedDiscount);

    // Set the selected discount in the shared service asynchronously
    this.sharedService.setDiscount(this.selectedDiscount);
 // Log the value saved in local storage

    console.log('ok');
    this.closeOverlay();
  }
}
