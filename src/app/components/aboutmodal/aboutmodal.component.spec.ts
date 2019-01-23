import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutmodalComponent } from './aboutmodal.component';

describe('AboutmodalComponent', () => {
  let component: AboutmodalComponent;
  let fixture: ComponentFixture<AboutmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
