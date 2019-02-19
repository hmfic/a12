import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tree20Component } from './tree20.component';

describe('Tree20Component', () => {
  let component: Tree20Component;
  let fixture: ComponentFixture<Tree20Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tree20Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tree20Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
