import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationClientsComponent } from './application-clients.component';

describe('ApplicationClientsComponent', () => {
  let component: ApplicationClientsComponent;
  let fixture: ComponentFixture<ApplicationClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
