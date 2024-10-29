import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectGuessComponent } from './correct-guess.component';

describe('CorrectGuessComponent', () => {
  let component: CorrectGuessComponent;
  let fixture: ComponentFixture<CorrectGuessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorrectGuessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorrectGuessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
