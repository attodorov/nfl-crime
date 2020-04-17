import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimeTimelineComponent } from './crime-timeline.component';

describe('CrimeTimelineComponent', () => {
  let component: CrimeTimelineComponent;
  let fixture: ComponentFixture<CrimeTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrimeTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrimeTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
