import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuseComponent } from './issuse.component';

describe('IssuseComponent', () => {
  let component: IssuseComponent;
  let fixture: ComponentFixture<IssuseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IssuseComponent]
    });
    fixture = TestBed.createComponent(IssuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
