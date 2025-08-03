import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BeerEditorPage } from './beer-editor.page';

describe('BeerEditorPage', () => {
  let component: BeerEditorPage;
  let fixture: ComponentFixture<BeerEditorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
