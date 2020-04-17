import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPlayersCrimeComponent } from './top-players-crime.component';

describe('TopPlayersCrimeComponent', () => {
  let component: TopPlayersCrimeComponent;
  let fixture: ComponentFixture<TopPlayersCrimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopPlayersCrimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopPlayersCrimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
