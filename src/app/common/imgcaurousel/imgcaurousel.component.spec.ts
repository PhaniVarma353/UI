import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgcaurouselComponent } from './imgcaurousel.component';

describe('ImgcaurouselComponent', () => {
  let component: ImgcaurouselComponent;
  let fixture: ComponentFixture<ImgcaurouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgcaurouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgcaurouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
