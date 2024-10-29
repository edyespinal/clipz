import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedGameComponent } from './finished-game.component';

describe('FinishedGameComponent', () => {
  let component: FinishedGameComponent;
  let fixture: ComponentFixture<FinishedGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishedGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishedGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
