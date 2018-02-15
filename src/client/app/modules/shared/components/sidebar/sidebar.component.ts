import { Component } from '@angular/core';

// app
import { LogService } from '../../../core/services/logging/log.service';

@Component({
  moduleId: module.id,
  selector: 'sd-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: [
    'sidebar.component.css',
  ],
})
export class SidebarComponent {

  constructor(private log: LogService) {}

  public openLanguages(e: any): void {
    this.log.debug('openLanguages');
  }
}
