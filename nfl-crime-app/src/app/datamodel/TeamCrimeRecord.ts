export class TeamCrimeRecord {

  private _id: string = null;
  private _name: string = null;
  private _city: string = null;
  private _arrestcount: number = 0;
  private _crime: string = null;

  constructor() {

  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
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

  public get city(): string {
    return this._city;
  }
  public set city(value: string) {
    this._city = value;
  }

  public get arrestcount(): number {
    return this._arrestcount;
  }

  public set arrestcount(value: number) {
    this._arrestcount = value;
  }

}
