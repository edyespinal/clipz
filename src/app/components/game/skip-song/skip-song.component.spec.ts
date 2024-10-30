import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkipSongComponent } from './skip-song.component';

describe('SkipSongComponent', () => {
  let component: SkipSongComponent;
  let fixture: ComponentFixture<SkipSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkipSongComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkipSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
