import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTeamsCrimeComponent } from './top-teams-crime.component';

describe('TopTeamsCrimeComponent', () => {
  let component: TopTeamsCrimeComponent;
  let fixture: ComponentFixture<TopTeamsCrimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopTeamsCrimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopTeamsCrimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
