import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutmeEditFormComponent } from './aboutme-edit-form.component';

describe('AboutmeEditFormComponent', () => {
  let component: AboutmeEditFormComponent;
  let fixture: ComponentFixture<AboutmeEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutmeEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutmeEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
