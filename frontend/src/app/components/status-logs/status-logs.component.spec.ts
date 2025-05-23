import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusLogsComponent } from './status-logs.component';

describe('StatusLogsComponent', () => {
  let component: StatusLogsComponent;
  let fixture: ComponentFixture<StatusLogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusLogsComponent]
    });
    fixture = TestBed.createComponent(StatusLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
