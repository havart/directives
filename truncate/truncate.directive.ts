import { Directive, ElementRef, Input, Host, Renderer2, AfterViewInit, ViewContainerRef, NgZone } from '@angular/core';

import { toInteger } from 'lodash';
import { AriaDescriber, FocusMonitor } from '@angular/cdk/a11y';
import { MatTooltip } from '@angular/material';
import { Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { Directionality } from '@angular/cdk/bidi';


@Directive({
  selector: '[appTruncate]'
})
export class TruncateDirective extends MatTooltip implements AfterViewInit {

  @Input() public truncateSize: string; // 300|100
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
    private focusMonitor: FocusMonitor,
    private dir: Directionality) {
    super(
      overlay,
      el,
      scrollDispatcher,
      viewContainerRef,
      ngZone,
      platform,
      ariaDescriber,
      focusMonitor,
      () => { },
      dir
    );
  }

  public ngAfterViewInit() {
    const width = this.el.nativeElement.offsetWidth;
    const size = toInteger(this.truncateSize);
    if (size < width) {
      this.renderer.addClass(this.el.nativeElement, 'truncate');
      this.renderer.setStyle(this.el.nativeElement, 'width', this.truncateSize + 'px');
      this.message = this.truncateText;
      this.position = 'above';
    }
  }

}
