import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInoutTimeComponent } from './update-inout-time.component';

describe('UpdateInoutTimeComponent', () => {
  let component: UpdateInoutTimeComponent;
  let fixture: ComponentFixture<UpdateInoutTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateInoutTimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateInoutTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
