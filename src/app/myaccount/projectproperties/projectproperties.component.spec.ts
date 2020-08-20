import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectpropertiesComponent } from './projectproperties.component';

describe('ProjectpropertiesComponent', () => {
  let component: ProjectpropertiesComponent;
  let fixture: ComponentFixture<ProjectpropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectpropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectpropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
