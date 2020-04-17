import { Component, OnInit, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { NfldataServiceService } from '../nfldata-service.service';
import { CrimeRecord } from '../datamodel/CrimeRecord';
import { CrimeTimelineDataPoint } from '../datamodel/CrimeTimelineDataPoint';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';

@Component({
  selector: 'app-crime-timeline',
  templateUrl: './crime-timeline.component.html',
  styleUrls: ['./crime-timeline.component.css']
})
export class CrimeTimelineComponent implements OnInit {

  public chart: Chart = null;
  public crimes: Array<CrimeRecord> = null;
  public crimetimelineData: Array<CrimeTimelineDataPoint> = null;
  public _selectedCrime: string = null;

  public labels: Array<string> = new Array<string>();
  public arrestData: Array<number> = new Array<number>();

  constructor(private elementRef: ElementRef, private nflDataService: NfldataServiceService) {

  }

  public get selectedCrime(): string {
    return this._selectedCrime;
  }
  public set selectedCrime(value: string) {
    this._selectedCrime = value;
    // also clear filter in case any value is set
    //this.filterInput = "";
    //Refresh table !
    this.getCrimeTimelineData(this._selectedCrime);
  }

  ngOnInit() {
    // get data
    this.nflDataService.getTopCrimes().subscribe(resp => {
      this.crimes = resp;
      // can also avoid the nesting of callbacks using async / await mechanism
      if (this.crimes && this.crimes.length > 0) {
        // initialize with first one, crimes will be bound to a dropdown
        // setter will take care of table refresh.
        this.selectedCrime = this.crimes[0].name;
      }
    });

    let canvasRef = this.elementRef.nativeElement.querySelector("#canvas");
    this.chart = new Chart(canvasRef, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: "# of Arrests",
            data: this.arrestData,
            backgroundColor: this.generateBackgroundColors(),
            fill: true
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

  public getCrimeTimelineData(crime: string): void {
    this.nflDataService.getCrimeTimeline(crime).subscribe(resp => {
      this.crimetimelineData = resp;
      // transform chart sources
      this.initChartData();
    });
  }

  private initChartData() {
    // take this.crimelineData and transform to chart data
    this.labels = [];
    this.arrestData = [];
    for (let i = 0; i < this.crimetimelineData.length; i++) {
      this.labels.push(this.crimetimelineData[i].year + "-" + this.crimetimelineData[i].month);
      this.arrestData.push(this.crimetimelineData[i].arrestcount);
    }
    this.chart.data.labels = this.labels;
    this.chart.data.datasets[0].data = this.arrestData;
    this.chart.data.datasets[0].backgroundColor = this.generateBackgroundColors();
    this.chart.update();
  }

  private generateBackgroundColors() {
    let cols = [];
    for (var i = 0; i < this.arrestData.length; i++) {
      cols.push("#fcba03");
    }
    return cols;
  }

}
