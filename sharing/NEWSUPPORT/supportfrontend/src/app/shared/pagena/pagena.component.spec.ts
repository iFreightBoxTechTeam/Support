import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagenaComponent } from './pagena.component';

describe('PagenaComponent', () => {
  let component: PagenaComponent;
  let fixture: ComponentFixture<PagenaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagenaComponent]
    });
    fixture = TestBed.createComponent(PagenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
