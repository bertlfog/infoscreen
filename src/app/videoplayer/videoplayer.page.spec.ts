import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoplayerPage } from './videoplayer.page';

describe('VideoplayerPage', () => {
  let component: VideoplayerPage;
  let fixture: ComponentFixture<VideoplayerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoplayerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
