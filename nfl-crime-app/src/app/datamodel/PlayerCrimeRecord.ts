export class PlayerCrimeRecord {

  private _name: string = null;
  private _crime: string = null;
  private _arrestcount: number = 0;

  constructor() {

  }

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  public get crime(): string {
    return this._crime;
  }
  public set crime(value: string) {
    this._crime = value;
  }

  public get arrestcount(): number {
    return this._arrestcount;
  }

  public set arrestcount(value: number) {
    this._arrestcount = value;
  }

}
