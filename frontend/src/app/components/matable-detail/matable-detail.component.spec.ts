import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatableDetailComponent } from './matable-detail.component';

describe('MatableDetailComponent', () => {
  let component: MatableDetailComponent;
  let fixture: ComponentFixture<MatableDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatableDetailComponent]
    });
    fixture = TestBed.createComponent(MatableDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
