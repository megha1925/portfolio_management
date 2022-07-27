import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEachStockComponent } from './view-each-stock.component';

describe('ViewEachStockComponent', () => {
  let component: ViewEachStockComponent;
  let fixture: ComponentFixture<ViewEachStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEachStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEachStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
