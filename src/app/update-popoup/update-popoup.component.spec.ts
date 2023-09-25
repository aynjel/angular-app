import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePopoupComponent } from './update-popoup.component';

describe('UpdatePopoupComponent', () => {
  let component: UpdatePopoupComponent;
  let fixture: ComponentFixture<UpdatePopoupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePopoupComponent]
    });
    fixture = TestBed.createComponent(UpdatePopoupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
