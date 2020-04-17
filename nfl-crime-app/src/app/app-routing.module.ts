import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopCrimesComponent } from './top-crimes/top-crimes.component';
import { TopPlayersCrimeComponent } from './top-players-crime/top-players-crime.component';
import { TopTeamsCrimeComponent } from './top-teams-crime/top-teams-crime.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'top-crimes', component: TopCrimesComponent, pathMatch: "full" },
  { path: 'top-players-for-crime', component: TopPlayersCrimeComponent},
  { path: 'top-teams-for-crime', component: TopTeamsCrimeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }