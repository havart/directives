import { Directive, ElementRef, Input, Host, Renderer2, AfterViewInit, ViewContainerRef, NgZone } from '@angular/core';
import { MdTooltip, Overlay, ScrollDispatcher, Platform, Directionality, ScrollStrategy } from '@angular/material';
import { toInteger } from 'lodash';
import { AriaDescriber } from '@angular/cdk/a11y';

@Directive({
  selector: '[truncate]'
})
export class TruncateDirective extends MdTooltip implements AfterViewInit {

  @Input() public truncateSize: number; // auto|300|100
  @Input() public truncateText: string; // text for tooltip

  constructor(
    private renderer: Renderer2,
    public overlay: Overlay,
    private el: ElementRef,
    private scrollDispatcher: ScrollDispatcher,
    private viewContainerRef: ViewContainerRef,
    private ngZone: NgZone,
    private platform: Platform,
    private ariaDescriber: AriaDescriber,
    private dir: Directionality) {
    super(
      renderer,
      overlay,
      el,
      scrollDispatcher,
      viewContainerRef,
      ngZone,
      platform,
      ariaDescriber,
      (r) => r,
      dir
    );
  }

  public ngAfterViewInit() {
    const width = this.el.nativeElement.offsetWidth;
    const size = toInteger(this.truncateSize);
    if (size && size < width) {
      this.renderer.addClass(this.el.nativeElement, 'truncate');
      this.renderer.setStyle(this.el.nativeElement, 'width', this.truncateSize + 'px');
      this.message = this.truncateText;
      this.position = 'above';
    }
  }

}
