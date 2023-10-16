import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserActivateComponent } from './new-user-activate.component';

describe('NewUserActivateComponent', () => {
  let component: NewUserActivateComponent;
  let fixture: ComponentFixture<NewUserActivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUserActivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserActivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
