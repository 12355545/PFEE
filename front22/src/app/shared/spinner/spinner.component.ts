import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderState } from 'src/app/services/loader/loader-state';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  displaySpinner = false;
  subscription: Subscription | undefined;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.subscription = this.loaderService.loaderState.subscribe({
      next: (state: LoaderState) => {
        this.displaySpinner = state.show;
        if (!state.show) {
          // Add a small delay (e.g., 500ms) before hiding the spinner
          setTimeout(() => {
            this.displaySpinner = false;
          }, 1000);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
