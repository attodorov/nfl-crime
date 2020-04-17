import { Component, OnInit } from '@angular/core';
import { NfldataServiceService } from '../nfldata-service.service';
import { CrimeRecord } from '../datamodel/CrimeRecord';

@Component({
  selector: 'app-top-crimes',
  templateUrl: './top-crimes.component.html',
  styleUrls: ['./top-crimes.component.css']
})
export class TopCrimesComponent implements OnInit {

  public columnsToDisplay: Array<string> = ['name', 'arrestcount'];

  constructor(private nflDataService: NfldataServiceService) {
    this.topcrimes = new Array<CrimeRecord>();
  }

  public topcrimes: Array<CrimeRecord> = null;

  public topcrimesFiltered: Array<CrimeRecord> = null;

  ngOnInit() {
    this.getTopCrimes();
  }

  public getTopCrimes(): void {
    this.nflDataService.getTopCrimes().subscribe(resp => {
      this.topcrimes = resp;
      this.topcrimesFiltered = this.topcrimes;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.trim() == "") {
      this.topcrimesFiltered = this.topcrimes;
    }
    this.topcrimesFiltered = this.topcrimes.filter(function (row) {
      return row.name.toLowerCase().indexOf(filterValue.trim().toLowerCase()) >= 0;
    });
  }

}
