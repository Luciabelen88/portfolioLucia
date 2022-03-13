import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsAddFormComponent } from './skills-add-form.component';

describe('SkillsAddFormComponent', () => {
  let component: SkillsAddFormComponent;
  let fixture: ComponentFixture<SkillsAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsAddFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
