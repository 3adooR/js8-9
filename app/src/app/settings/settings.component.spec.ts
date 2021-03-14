import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have "rus" in selected "userLanguage"', () => {
    const elem = fixture.debugElement.nativeElement.querySelector('#userLanguage');
    expect(elem.value).toBe('rus');
  });

  it('should have "eng" in selected "language"', () => {
    const elem = fixture.debugElement.nativeElement.querySelector('#language');
    expect(elem.value).toBe('eng');
  });

  it('should have 10 in "numberOfWordsInput"', () => {
    const elem = fixture.debugElement.nativeElement.querySelector('#numberOfWordsInput');
    expect(parseInt(elem.value)).toBe(10);
  });

  it('should have 60 in "timeInput"', () => {
    const elem = fixture.debugElement.nativeElement.querySelector('#timeInput');
    expect(parseInt(elem.value)).toBe(60);
  });
});
