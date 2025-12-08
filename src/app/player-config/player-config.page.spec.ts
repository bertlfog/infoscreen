import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerConfigPage } from './player-config.page';

describe('PlayerConfigPage', () => {
  let component: PlayerConfigPage;
  let fixture: ComponentFixture<PlayerConfigPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerConfigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
