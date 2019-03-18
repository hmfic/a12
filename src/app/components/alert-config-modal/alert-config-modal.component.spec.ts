import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertConfigModalComponent } from './alert-config-modal.component';

describe('AlertConfigModalComponent', () => {
  let component: AlertConfigModalComponent;
  let fixture: ComponentFixture<AlertConfigModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertConfigModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertConfigModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
