import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueTypeComponent } from './issue-type.component';

describe('IssueTypeComponent', () => {
  let component: IssueTypeComponent;
  let fixture: ComponentFixture<IssueTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IssueTypeComponent]
    });
    fixture = TestBed.createComponent(IssueTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
