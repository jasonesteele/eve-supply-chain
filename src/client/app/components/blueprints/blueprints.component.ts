import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LogService } from '../../modules/core/services/logging/log.service';
import { BlueprintService } from '../../modules/eve-data/services/blueprint.service';
import { BlueprintType } from '../../modules/eve-data/eve-data-types';
import { ReplaySubject } from 'rxjs/ReplaySubject';

declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'sd-blueprints',
  templateUrl: 'blueprints.component.html',
  styleUrls: [
    'blueprints.component.css',
  ],
})
export class BlueprintsComponent implements OnInit, AfterViewInit {
  @ViewChild('blueprintsTable') tableEl: ElementRef;
  @ViewChild('panel') panelEl: ElementRef;

  blueprints: BlueprintType[];

  private table: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(public log: LogService,
              private blueprintService: BlueprintService) {
  }

  ngOnInit() {
    this.blueprintService.getBlueprints().subscribe(blueprints => {
      this.blueprints = blueprints;
      this.table.subscribe(table => {
        table.fnClearTable();
        if (this.blueprints.length > 0) {
          table.fnAddData(blueprints);
        }
      });
    });
  }

  ngAfterViewInit(): void {
    this.table.next($(this.tableEl.nativeElement).dataTable({
      columns: [
        {title: 'Name', defaultContent: '', data: 'name'},
        {title: 'Group', defaultContent: '', data: 'group.name'},
        {title: 'Max Runs', defaultContent: '', data: 'maxProductLimit'},
        {title: 'Portion', defaultContent: '', data: 'portionSize'}
      ],
      pagingType: 'full',
      dom: '<"quick-filter"><"top"lip><"clear">r<"datatable-scroll"t><"bottom"ip><"clear">',
      pageLength: 25,
      lengthMenu: [25, 50, 100, 500],
      order: [[0, "asc"]],
      columnDefs: [
        {targets: 2, width: '5px', style: 'nowrap'},
        {targets: 3, width: '5px', style: 'nowrap'},
      ],
    }));

    this.table.subscribe(table => {
      const filterInput = $('<input type="text" placeholder="Quick Filter">');
      filterInput.keyup(() => {
        table.fnFilter(filterInput.val());
      });
      $(this.panelEl.nativeElement).find('.quick-filter').html(filterInput);
    });
  }
}
