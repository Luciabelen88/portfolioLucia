import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortSkillsBtnComponent } from './sort-skills-btn.component';

describe('SortSkillsBtnComponent', () => {
  let component: SortSkillsBtnComponent;
  let fixture: ComponentFixture<SortSkillsBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortSkillsBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortSkillsBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
