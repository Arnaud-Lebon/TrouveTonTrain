import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleJourneyComponent } from './single-journey.component';

describe('SingleJourneyComponent', () => {
  let component: SingleJourneyComponent;
  let fixture: ComponentFixture<SingleJourneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleJourneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
