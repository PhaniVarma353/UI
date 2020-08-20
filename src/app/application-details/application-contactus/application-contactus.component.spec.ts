import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationContactusComponent } from './application-contactus.component';

describe('ApplicationContactusComponent', () => {
  let component: ApplicationContactusComponent;
  let fixture: ComponentFixture<ApplicationContactusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationContactusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationContactusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
