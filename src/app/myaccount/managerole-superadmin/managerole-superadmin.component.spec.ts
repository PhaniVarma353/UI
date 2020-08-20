import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageroleSuperadminComponent } from './managerole-superadmin.component';

describe('ManageroleSuperadminComponent', () => {
  let component: ManageroleSuperadminComponent;
  let fixture: ComponentFixture<ManageroleSuperadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageroleSuperadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageroleSuperadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
