import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSavedComponent } from './single-saved.component';

describe('SingleSavedComponent', () => {
  let component: SingleSavedComponent;
  let fixture: ComponentFixture<SingleSavedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleSavedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
