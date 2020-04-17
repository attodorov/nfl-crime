import { Injectable, EventEmitter } from '@angular/core';
import { CrimeRecord } from './datamodel/CrimeRecord';
import { PlayerCrimeRecord } from './datamodel/PlayerCrimeRecord';
import { TeamCrimeRecord } from './datamodel/TeamCrimeRecord';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CrimeTimelineDataPoint } from './datamodel/CrimeTimelineDataPoint';

//A.T.: if we want UI components to be truly reusable across angular apps, this data service
// may be split among components so that they are also reusable across multiple apps.
@Injectable()
export class NfldataServiceService {

  constructor(private http: HttpClient) {

  }

  public datesChanged: EventEmitter<void> = new EventEmitter<void>();

  public _startDate: string = null;
  public _endDate: string = null;

  public get startDate() : string {
    return this._startDate;
  }

  public set startDate(date: string) {
    this._startDate = date;
    this.datesChanged.emit();
  }

  public get endDate() : string {
    return this._endDate;
  }

  public set endDate(date: string) {
    this._endDate = date;
    this.datesChanged.emit();
  }

  private encodeRequestParams() {
    let params: string = "";
    if (this.startDate && this.endDate) {
      params += "?start_date=" + this.startDate + "&end_date=" + this.endDate;
    }
    return params;
  }

  //A.T. TODO: Don't hardcode the urls here! Retrieve from config.
  public getTopCrimes(startDate?: string, endDate?: string): Observable<CrimeRecord[]> {
    return this.http.get<CrimeRecord[]>("http://localhost:3000/api/v1/topcrimes" + this.encodeRequestParams());
  }

  public getTopPlayersForCrime(crime: string, startDate?: string, endDate?: string): Observable<PlayerCrimeRecord[]> {
    return this.http.get<PlayerCrimeRecord[]>("http://localhost:3000/api/v1/topplayersforcrime" + "/" + crime + this.encodeRequestParams());
  }

  public getTopTeamsForCrime(crime: string, startDate?: string, endDate?: string): Observable<TeamCrimeRecord[]> {
    return this.http.get<TeamCrimeRecord[]>("http://localhost:3000/api/v1/topteamsforcrime" + "/" + crime + this.encodeRequestParams());
  }

  public getCrimeTimeline(crime: string, startDate?: string, endDate?: string): Observable<CrimeTimelineDataPoint[]> {
    return this.http.get<CrimeTimelineDataPoint[]>("http://localhost:3000/api/v1/crimetimeline" + "/" + crime + this.encodeRequestParams());
  }
}
