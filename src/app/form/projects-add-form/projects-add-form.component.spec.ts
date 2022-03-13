import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsAddFormComponent } from './projects-add-form.component';

describe('ProjectsAddFormComponent', () => {
  let component: ProjectsAddFormComponent;
  let fixture: ComponentFixture<ProjectsAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsAddFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
