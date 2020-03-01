import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedJourneysComponent } from './saved-journeys.component';

describe('SavedJourneysComponent', () => {
  let component: SavedJourneysComponent;
  let fixture: ComponentFixture<SavedJourneysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedJourneysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedJourneysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
