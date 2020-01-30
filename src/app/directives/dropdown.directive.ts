import {
  Directive,
  HostBinding,
  HostListener,
  ElementRef
} from "@angular/core";

@Directive({
  selector: "[appDropdown]",
  exportAs: "appDropdown"
})
export class DropdownDirective {
  @HostBinding("class.show") isOpen: boolean = false;

  @HostListener("click", ["$event"]) dropDownToggle(event: Event) {
    this.isOpen = this.elementRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }

  @HostListener("document:click", ["$event"]) clickout(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  constructor(private elementRef: ElementRef) {}
}
