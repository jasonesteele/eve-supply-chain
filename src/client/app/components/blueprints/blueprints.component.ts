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
          table.fnAddData(this.blueprints);
        }
      });
    });
  }

  ngAfterViewInit(): void {
    this.table.next($(this.tableEl.nativeElement).dataTable({
      columns: [
        {
          title: 'Activities', defaultContent: '', className: 'nowrap',
          render: function (data: any, type: any, row: any, meta: any) {
            let retval = '';
            if (type === 'display') {
              for (const key in row.activities) {
                retval += ` <i class="eve-icon eve-${key} inverted"></i>`;
              }
            } else {
              for (const key in row.activities) {
                retval += key;
              }
            }
            return retval;
          }
        },
        {title: 'Blueprint Name', defaultContent: '', data: 'name'},
        {title: 'Group', defaultContent: '', data: 'group.name'}
      ],
      pagingType: 'full',
      dom: '<"quick-filter"><"top"lip><"clear">r<"datatable-scroll"t><"bottom"ip><"clear">',
      pageLength: 25,
      lengthMenu: [25, 50, 100, 500],
      order: [[1, "asc"]],
      columnDefs: [{ targets: 0, orderable: false, width: '116px'}],
      responsive: true,
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
