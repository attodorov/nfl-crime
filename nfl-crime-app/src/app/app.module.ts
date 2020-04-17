import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TopCrimesComponent } from './top-crimes/top-crimes.component';
import { TopPlayersCrimeComponent } from './top-players-crime/top-players-crime.component';
import { TopTeamsCrimeComponent } from './top-teams-crime/top-teams-crime.component';
import { AppRoutingModule } from './/app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule, MatTableDataSource, MatSelectModule, MatInputModule, MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NfldataServiceService } from './nfldata-service.service';
import { CrimeTimelineComponent } from './crime-timeline/crime-timeline.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    TopCrimesComponent,
    TopPlayersCrimeComponent,
    TopTeamsCrimeComponent,
    NavbarComponent,
    CrimeTimelineComponent,
    DatePickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    HttpClientModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatNativeDateModule
  ],
  providers: [NfldataServiceService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
