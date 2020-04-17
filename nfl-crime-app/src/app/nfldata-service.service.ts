import { Injectable } from '@angular/core';
import { CrimeRecord } from './datamodel/CrimeRecord';
import { PlayerCrimeRecord } from './datamodel/PlayerCrimeRecord';
import { TeamCrimeRecord } from './datamodel/TeamCrimeRecord';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NfldataServiceService {

  constructor(private http: HttpClient) {

  }

  //A.T. TODO: Don't hardcode the urls here! Retrieve from config.
  public getTopCrimes(): Observable<CrimeRecord[]> {
    return this.http.get<CrimeRecord[]>("http://localhost:3000/api/v1/topcrimes");
  }

  public getTopPlayersForCrime(crime: string): Observable<PlayerCrimeRecord[]> {
    return this.http.get<PlayerCrimeRecord[]>("http://localhost:3000/api/v1/topplayersforcrime" + "/" + crime);
  }

  public getTopTeamsForCrime(crime: string): Observable<TeamCrimeRecord[]> {
    return this.http.get<TeamCrimeRecord[]>("http://localhost:3000/api/v1/topteamsforcrime" + "/" + crime);
  }
}
