import { Component, OnInit } from '@angular/core';
import { NfldataServiceService } from '../nfldata-service.service';
import { CrimeRecord } from '../datamodel/CrimeRecord';
import { TeamCrimeRecord } from '../datamodel/TeamCrimeRecord';

@Component({
  selector: 'app-top-teams-crime',
  templateUrl: './top-teams-crime.component.html',
  styleUrls: ['./top-teams-crime.component.css']
})
export class TopTeamsCrimeComponent implements OnInit {

  public _selectedCrime: string = null;
  public columnsToDisplay: Array<string> = ['id', 'name', "city", "arrestcount"];

  constructor(private nflDataService: NfldataServiceService) {
    this.crimes = new Array<CrimeRecord>();
    this.topteamcrimes = new Array<TeamCrimeRecord>();
  }

  public crimes: Array<CrimeRecord> = null;
  public topteamcrimes: Array<TeamCrimeRecord> = null;

  ngOnInit() {
    this.initializeData();
  }

  public get selectedCrime(): string {
    return this._selectedCrime;
  }
  public set selectedCrime(value: string) {
    this._selectedCrime = value;
    //Refresh table !
    this.getTopTeamCrimes(this._selectedCrime);
  }

  private async initializeData() {
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

  public getTopTeamCrimes(crime: string): void {
    this.nflDataService.getTopTeamsForCrime(crime). subscribe(resp => {
      this.topteamcrimes = resp;
    });
  }

}
