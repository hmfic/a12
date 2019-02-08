import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tree10Component } from './tree10.component';

describe('Tree10Component', () => {
  let component: Tree10Component;
  let fixture: ComponentFixture<Tree10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tree10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tree10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
