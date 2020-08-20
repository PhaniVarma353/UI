import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyhomeviewComponent } from './myhomeview.component';

describe('MyhomeviewComponent', () => {
  let component: MyhomeviewComponent;
  let fixture: ComponentFixture<MyhomeviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyhomeviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyhomeviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
