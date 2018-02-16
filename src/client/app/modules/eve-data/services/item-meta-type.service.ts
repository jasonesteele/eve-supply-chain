import { Injectable } from '@angular/core';
import { LogService } from '../../core/services/logging/log.service';
import { EveStaticDataService } from './eve-static-data.service';
import { ItemMetaGroup, ItemMetaType } from '../eve-data-types';
import { TranslateService } from '@ngx-translate/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

/**
 * Service for querying item meta groups.
 */
@Injectable()
export class ItemMetaTypeService {
  private metaTypes = new ReplaySubject<Map<number, ItemMetaType>>(1);
  private metaGroups = new ReplaySubject<Map<number, ItemMetaGroup>>(1);

  constructor(dataService: EveStaticDataService,
              public log: LogService,
              private translate: TranslateService) {
    const vm = this;
    dataService.get('bsd/invMetaGroups.json').subscribe(
      json => {
        let metaGroups = new Map<number, ItemMetaGroup>();
        for (const metaGroup of json) {
          metaGroups.set(metaGroup.metaGroupID, {
            id: metaGroup.metaGroupID,
            name: metaGroup.metaGroupName
          });
        }
        vm.metaGroups.next(metaGroups);

        dataService.get('bsd/invMetaTypes.json').subscribe(json => {
            let metaTypes = new Map<number, ItemMetaType>();
            for (const elem of json) {
              let metaGroup = metaGroups.get(elem.metaGroupID);
              let metaType = {
                id: elem.typeID,
                metaGroup: metaGroup,
                parentTypeId: elem.parentTypeID
              };
              metaTypes.set(elem.typeID, metaType);
            }
            vm.metaTypes.next(metaTypes);
          },
          (err) => vm.metaTypes.error(err),
          () => vm.metaTypes.complete());
      },
      (err) => vm.metaGroups.error(err),
      () => vm.metaGroups.complete()
    );
  }

  /**
   * Retrieves the meta-type of an item type by ID number.
   * @param {number} id
   * @returns {Observable<ItemMetaType>} meta type or null if item has no meta type
   */
  getMetaType(id:number): Observable<ItemMetaType> {
    const vm = this;
    return this.metaTypes.map(metaTypes => metaTypes.get(id));
  }
}
