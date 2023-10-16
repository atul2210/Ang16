import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmtRcvtThanksComponent } from './pmt-rcvt-thanks.component';

describe('PmtRcvtThanksComponent', () => {
  let component: PmtRcvtThanksComponent;
  let fixture: ComponentFixture<PmtRcvtThanksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmtRcvtThanksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmtRcvtThanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
