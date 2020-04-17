import { Component, OnInit } from '@angular/core';
import { NfldataServiceService } from '../nfldata-service.service';
import { CrimeRecord } from '../datamodel/CrimeRecord';
import { PlayerCrimeRecord } from '../datamodel/PlayerCrimeRecord';

@Component({
  selector: 'app-top-players-crime',
  templateUrl: './top-players-crime.component.html',
  styleUrls: ['./top-players-crime.component.css']
})
export class TopPlayersCrimeComponent implements OnInit {

  public _selectedCrime: string = null;
  public columnsToDisplay: Array<string> = ['name', 'arrestcount'];

  constructor(private nflDataService: NfldataServiceService) {
    this.crimes = new Array<CrimeRecord>();
    this.topplayercrimes = new Array<PlayerCrimeRecord>();
  }

  public crimes: Array<CrimeRecord> = null;
  public topplayercrimes: Array<PlayerCrimeRecord> = null;

  ngOnInit() {
    this.initializeData();
  }

  public get selectedCrime(): string {
    return this._selectedCrime;
  }
  public set selectedCrime(value: string) {
    this._selectedCrime = value;
    //Refresh table !
    this.getTopPlayerCrimes(this._selectedCrime);
  }

  private initializeData() {
    this.nflDataService.getTopCrimes().subscribe(resp => {
      this.crimes = resp;
      // can also avoid the nesting of callbacks using async / await mechanism
      if (this.crimes && this.crimes.length > 0) {
        // initialize with first one, crimes will be bound to a dropdown
        // setter will take care of table refresh.
        this.selectedCrime = this.crimes[0].name;
      }
    });
  }

  public getTopPlayerCrimes(crime: string): void {
    this.nflDataService.getTopPlayersForCrime(crime).subscribe(resp => {
      this.topplayercrimes = resp;
    });
  }
}
