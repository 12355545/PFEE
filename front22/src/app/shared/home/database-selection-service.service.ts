import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseSelectionServiceService {

  private selectedDatabase: string = '';

  setDatabase(database: string) {
    this.selectedDatabase = database;
  }

  getDatabase() {
    return this.selectedDatabase;
  }
}
