import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskinfomodalComponent } from './riskinfomodal.component';

describe('RiskinfomodalComponent', () => {
  let component: RiskinfomodalComponent;
  let fixture: ComponentFixture<RiskinfomodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskinfomodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskinfomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
