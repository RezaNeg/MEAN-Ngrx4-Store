import { Directive, HostListener, Renderer, ElementRef, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appCapslock]'
})
export class CapslockDirective {
  @Output() capsLock: EventEmitter<any> = new EventEmitter();
  
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const capsOn = event.getModifierState && event.getModifierState('CapsLock');
    this.capsLock.emit(capsOn)
  }

  constructor() { }
  
}
