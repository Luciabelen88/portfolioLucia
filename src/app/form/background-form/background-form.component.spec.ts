import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundFormComponent } from './background-form.component';

describe('BackgroundFormComponent', () => {
  let component: BackgroundFormComponent;
  let fixture: ComponentFixture<BackgroundFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackgroundFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
