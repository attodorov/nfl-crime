import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public welcomeMsg: string = 'NFL Crime';

  public constructor(private titleService: Title) {

  }

  ngOnInit() {
    this.setTitle(this.welcomeMsg);
  }
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
