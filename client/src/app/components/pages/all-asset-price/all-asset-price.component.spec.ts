import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAssetPriceComponent } from './all-asset-price.component';

describe('AllAssetPriceComponent', () => {
  let component: AllAssetPriceComponent;
  let fixture: ComponentFixture<AllAssetPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAssetPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllAssetPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
