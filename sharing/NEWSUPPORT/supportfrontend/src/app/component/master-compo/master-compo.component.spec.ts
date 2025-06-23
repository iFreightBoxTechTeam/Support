import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCompoComponent } from './master-compo.component';

describe('MasterCompoComponent', () => {
  let component: MasterCompoComponent;
  let fixture: ComponentFixture<MasterCompoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MasterCompoComponent]
    });
    fixture = TestBed.createComponent(MasterCompoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
