import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageroleAdminComponent } from './managerole-admin.component';

describe('ManageroleAdminComponent', () => {
  let component: ManageroleAdminComponent;
  let fixture: ComponentFixture<ManageroleAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageroleAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageroleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
