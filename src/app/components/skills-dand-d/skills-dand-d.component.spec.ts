import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsDandDComponent } from './skills-dand-d.component';

describe('SkillsDandDComponent', () => {
  let component: SkillsDandDComponent;
  let fixture: ComponentFixture<SkillsDandDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsDandDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsDandDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
