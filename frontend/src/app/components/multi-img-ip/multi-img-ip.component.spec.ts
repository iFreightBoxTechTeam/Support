import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiImgIpComponent } from './multi-img-ip.component';

describe('MultiImgIpComponent', () => {
  let component: MultiImgIpComponent;
  let fixture: ComponentFixture<MultiImgIpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultiImgIpComponent]
    });
    fixture = TestBed.createComponent(MultiImgIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
