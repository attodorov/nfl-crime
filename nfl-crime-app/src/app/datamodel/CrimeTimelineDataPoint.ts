export class CrimeTimelineDataPoint {

  private _month: string = null;
  private _year: string = null;
  private _arrestcount: number = 0;

  constructor() {

  }

  public get month(): string {
      return this._month;
  }
  public set month(value: string) {
        this._month = value;
  }

  public get year(): string {
    return this._year;
}
public set year(value: string) {
      this._year = value;
}

  public get arrestcount(): number {
      return this._arrestcount;
  }
  public set arrestcount(value: number) {
      this._arrestcount = value;
  }

}
