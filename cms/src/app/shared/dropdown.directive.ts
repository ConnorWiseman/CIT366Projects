import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.show') isOpen = false;

  @HostListener('click') toggleOpen() {
    console.log('Click');
    this.isOpen = !this.isOpen;
  }

  @HostListener('mouseleave') close() {
    console.log('MouseLeave');
    this.isOpen = false;
  }
}
