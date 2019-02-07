import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Force10Component } from './force10.component';

describe('Force10Component', () => {
  let component: Force10Component;
  let fixture: ComponentFixture<Force10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Force10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Force10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
