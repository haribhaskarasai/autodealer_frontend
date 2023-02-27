import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDealerComponent } from './select-dealer.component';

describe('SelectDealerComponent', () => {
  let component: SelectDealerComponent;
  let fixture: ComponentFixture<SelectDealerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectDealerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
