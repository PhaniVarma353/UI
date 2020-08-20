import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageroleManagerComponent } from './managerole-manager.component';

describe('ManageroleManagerComponent', () => {
  let component: ManageroleManagerComponent;
  let fixture: ComponentFixture<ManageroleManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageroleManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageroleManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
