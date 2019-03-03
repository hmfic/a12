import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugecircleComponent } from './gaugecircle.component';

describe('GaugecircleComponent', () => {
  let component: GaugecircleComponent;
  let fixture: ComponentFixture<GaugecircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaugecircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaugecircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
