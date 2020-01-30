import { Directive, ElementRef, Renderer2, HostListener, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[appMyCustom]'
})
export class MyCustomDirective {


  @Input() defaultColor: string = 'transparent';
  @Input() hoverColor: string = 'lime';

  @HostBinding('style.backgroundColor') backgroundColor: string = this.defaultColor;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('mouseenter') mouseEnter(eventData: Event) {
    this.backgroundColor = this.hoverColor;
  }

  @HostListener('mouseleave') mouseLeave(eventData: Event) {
    this.backgroundColor = this.defaultColor;
  }

}
