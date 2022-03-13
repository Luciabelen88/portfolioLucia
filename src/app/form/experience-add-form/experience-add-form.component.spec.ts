import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceAddFormComponent } from './experience-add-form.component';

describe('ExperienceAddFormComponent', () => {
  let component: ExperienceAddFormComponent;
  let fixture: ComponentFixture<ExperienceAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperienceAddFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
