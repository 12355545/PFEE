import { Component, OnInit } from '@angular/core';
import { ConnectionService } from './../../services/services/connection.service';
import { ConnectionRequest } from 'src/app/services/models';
import { DatabaseSelectionServiceService } from './database-selection-service.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  databaseOptions: string[] = ['PFE', 'PFE_GIPA']; // Initial list of options
  loading: boolean = true;
  selectedDatabase: string = ''; // Initialize as an empty string

  customDatabaseName: string = '';
  isCustomOptionSelected: boolean = false;
  displayToBackendMapping: { [key: string]: string } = {
    'Mazraa': 'PFE',
    'Gipa': 'PFE_GIPA'
  };
  constructor(private connection: ConnectionService, private databaseSelectionService: DatabaseSelectionServiceService,private toast:NgToastService) {}

  ngOnInit() {
    // Load your data here and set loading to false when done.
    this.loading = false;

    // Retrieve the selected database from the service
    this.selectedDatabase = this.databaseSelectionService.getDatabase();
  }

  getDatabase(): void {
    if (this.selectedDatabase !== 'custom') {
      // Send a request to the backend with the selected database name
      this.sendRequestToBackend(this.selectedDatabase);
    } else if (this.customDatabaseName) {
      // Send a request to the backend with the custom name
      this.sendRequestToBackend(this.customDatabaseName);

      // Add custom name to the list of options
      this.databaseOptions.push(this.customDatabaseName);

      // Select the custom name
      this.selectedDatabase = this.customDatabaseName;

      // Reset the customDatabaseName
      this.customDatabaseName = '';
    } else {

      this.toast.info({
        type: 'info', // Add the type property
        detail: 'Error Message',
        summary: 'Please enter a custom database name'
      });
    }
  }

  getKeyFromMapping(value: string): string | undefined {
    return Object.keys(this.displayToBackendMapping).find(
      key => this.displayToBackendMapping[key] === value
    );
  }




   // Function to send a request to the backend with the custom database name
   sendRequestToBackend(customName: string) {
    const resetData: ConnectionRequest = { database: customName };
    this.connection.connectDatabaseDatabaseNamePut$Response({
      body: resetData
    }).subscribe(
      response => {
        if (!['PFE', 'PFE_GIPA'].includes(customName)) {
          // The selected database is not available in the options

          this.toast.error({
            type: 'error', // Add the type property
            detail: 'Error Message',
            summary: 'Database selected is not available: ' + customName,
          });


         // alert('Database selected is not available: ' + customName);
        } else {
          {
            // Get the key from the displayToBackendMapping based on the customName (which is the value)
            const key = this.getKeyFromMapping(customName);

            if (key) {
              this.toast.success({
                type: 'success', // Add the type property
                detail: 'Success Message',
                summary: 'Database selected is available:'+key,
              });

             // alert('Database selected is available: ' + key);
            } else {

              this.toast.error({
                type: 'error', // Add the type property
                detail: 'Error Message',
                summary: 'Invalid custom database name: ' + customName
              });

             // alert('Invalid custom database name: ' + customName);
            }
          }
        }
        // Store the selected database in the service
        this.databaseSelectionService.setDatabase(customName);
        localStorage.setItem('database', customName as any as string);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }


  onDatabaseChange(): void {
    if (this.selectedDatabase === 'custom') {
      // Display an alert when "Other" is selected
     // alert('Please enter a custom database name.');
     this.toast.info({
      type: 'info', // Add the type property
      detail: 'Error Message',
      summary: 'Please enter a custom database name'
    });
    } else if (!this.isCustomOptionSelected) {
      console.log(this.selectedDatabase)
      
      // For initial options like 'Mzraa' and 'Gipa', map them to the corresponding backend values and send to the backend
      const backendValue = this.displayToBackendMapping[this.selectedDatabase];
      console.log(backendValue)
      this.sendRequestToBackend(this.selectedDatabase);
    }
    this.isCustomOptionSelected = this.selectedDatabase === 'custom';
  }

  getDisplayOptions() {
    return Object.keys(this.displayToBackendMapping);
  }




  hideInput() {
    if (this.customDatabaseName === '') {
      this.isCustomOptionSelected = false;
    }
  }

  deleteOption(optionValue: string) {
    const index = this.databaseOptions.indexOf(optionValue);
    if (index !== -1) {
      this.databaseOptions.splice(index, 1);
      if (this.selectedDatabase === optionValue) {
        this.selectedDatabase = '';
      }
    }
  }
}
