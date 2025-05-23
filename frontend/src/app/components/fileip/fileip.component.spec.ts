import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileipComponent } from './fileip.component';

describe('FileipComponent', () => {
  let component: FileipComponent;
  let fixture: ComponentFixture<FileipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileipComponent]
    });
    fixture = TestBed.createComponent(FileipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
