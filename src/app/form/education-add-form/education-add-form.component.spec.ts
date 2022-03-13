import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationAddFormComponent } from './education-add-form.component';

describe('BackgroundAddFormComponent', () => {
  let component: EducationAddFormComponent;
  let fixture: ComponentFixture<EducationAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationAddFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
