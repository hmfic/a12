import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JmodalComponent } from './jmodal.component';

describe('JmodalComponent', () => {
  let component: JmodalComponent;
  let fixture: ComponentFixture<JmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
