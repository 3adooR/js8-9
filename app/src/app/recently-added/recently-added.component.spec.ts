import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RecentlyAddedComponent} from './recently-added.component';

describe('RecentlyAddedComponent', () => {
  let component: RecentlyAddedComponent;
  let fixture: ComponentFixture<RecentlyAddedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecentlyAddedComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no selectedWord', () => {
    expect(component.selectedWord).toBeUndefined();
  });

  it('should have empty errorMessage', () => {
    expect(component.errorMessage).toBe('');
  });

  it('should have 10 words in ul.words', () => {
    const words = fixture.debugElement.nativeElement.querySelectorAll('.words li');
    expect(words.length).toBe(10);
  });

  it('should have 10 words', () => {
    expect(component.words.length).toBe(10);
  });

  it('should contain "ADD" in button.btn-primary', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('button.btn-primary');
    expect(btn.innerHTML).toContain('ADD');
  });

  it('should have 2 inputs in form', () => {
    const inputs = fixture.debugElement.nativeElement.querySelectorAll('form input');
    expect(inputs.length).toBe(2);
  });
});
