import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsEditFormComponent } from './projects-edit-form.component';

describe('ProjectsEditFormComponent', () => {
  let component: ProjectsEditFormComponent;
  let fixture: ComponentFixture<ProjectsEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
