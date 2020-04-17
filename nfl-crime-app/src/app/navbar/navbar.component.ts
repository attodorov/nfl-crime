import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public topCrimesTitle: string = "Top Crimes";
  public topPlayersForCrimesTitle: string = "Top Players for Crime";
  public topTeamsForCrimeTitle: string = "Top Teams for Crime";

  constructor() { }

  ngOnInit() {
  }

}
