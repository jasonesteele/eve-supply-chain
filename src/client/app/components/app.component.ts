// any operators needed throughout your application
import './operators';
// libs
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
// app
import { AnalyticsService } from '../modules/analytics/services/index';
import { AppService, LogService } from '../modules/core/services/index';
import { Config } from '../modules/core/utils/index';

declare var $: any;

// Detect content panel resizing with a hidden iframe - browser don't
// currently report events on element resize and AdminLTE's side nav will
// be off if content is dynamically created
// TODO - extract this to an angular directive?
const CSS = 'position:absolute;left:0;top:-100%;width:100%;height:100%;margin:1px 0 0;border:none;opacity:0;visibility:hidden;pointer-events:none;';
let observeResize = (element, handler) => {
  let frame = document.createElement('iframe');
  frame.style.cssText = CSS;
  element.appendChild(frame);
  frame.contentWindow.onresize = () => {
    handler(element);
  };
  return frame;
};

/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('contentPanel') panelElem: ElementRef;

  constructor(public analytics: AnalyticsService,
              public log: LogService,
              private appService: AppService) {
    log.debug(`Config env: ${Config.ENVIRONMENT().ENV}`);
  }

  ngAfterViewInit(): void {
    const vm = this;
    observeResize(vm.panelElem.nativeElement, () => {
      $('.main-sidebar').height($('.content-wrapper').outerHeight() + $('footer').outerHeight());
    });
  }
}
