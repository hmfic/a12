import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryHistoComponent } from './category-histo.component';

describe('CategoryHistoComponent', () => {
  let component: CategoryHistoComponent;
  let fixture: ComponentFixture<CategoryHistoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryHistoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryHistoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
