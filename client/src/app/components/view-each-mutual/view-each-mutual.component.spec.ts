import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEachMutualComponent } from './view-each-mutual.component';

describe('ViewEachMutualComponent', () => {
  let component: ViewEachMutualComponent;
  let fixture: ComponentFixture<ViewEachMutualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEachMutualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEachMutualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
