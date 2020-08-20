import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationAboutusComponent } from './application-aboutus.component';

describe('ApplicationAboutusComponent', () => {
  let component: ApplicationAboutusComponent;
  let fixture: ComponentFixture<ApplicationAboutusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationAboutusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationAboutusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
