import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpmodalComponent } from './helpmodal.component';

describe('HelpmodalComponent', () => {
  let component: HelpmodalComponent;
  let fixture: ComponentFixture<HelpmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
