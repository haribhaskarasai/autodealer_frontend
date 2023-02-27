import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSelectedDocComponent } from './edit-selected-doc.component';

describe('EditSelectedDocComponent', () => {
  let component: EditSelectedDocComponent;
  let fixture: ComponentFixture<EditSelectedDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSelectedDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSelectedDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
