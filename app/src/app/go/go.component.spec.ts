import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {GoComponent} from './go.component';

describe('GoComponent', () => {
  let component: GoComponent;
  let fixture: ComponentFixture<GoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [GoComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy()
  });

  it('should have placeholder "Translate.." in #translateInput', () => {
    const elem = fixture.debugElement.nativeElement.querySelector('#translateInput');
    expect(elem.getAttribute('placeholder')).toContain('Translate..');
  });

  it('should show the word to translate and this length toBeGreaterThanOrEqual 1', () => {
    const elem = fixture.debugElement.nativeElement.querySelector('.word b');
    expect(elem.innerHTML.length).toBeGreaterThanOrEqual(1);
  });

  it('should have sended 2 parameters when keyEvent on #translateInput', () => {
    const spy = spyOn(component, 'checkWord');
    const event = new KeyboardEvent("keyup", {"key": "Enter"});
    const word = fixture.debugElement.nativeElement.querySelector('#translateInput');
    word.value = 'wrong answer';
    word.dispatchEvent(event);
    expect(spy.length).toBe(2);
  });
});
