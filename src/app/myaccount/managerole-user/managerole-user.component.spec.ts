import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageroleUserComponent } from './managerole-user.component';

describe('ManageroleUserComponent', () => {
  let component: ManageroleUserComponent;
  let fixture: ComponentFixture<ManageroleUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageroleUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageroleUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
