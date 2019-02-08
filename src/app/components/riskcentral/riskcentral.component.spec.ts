import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskcentralComponent } from './riskcentral.component';

describe('RiskcentralComponent', () => {
  let component: RiskcentralComponent;
  let fixture: ComponentFixture<RiskcentralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskcentralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskcentralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
