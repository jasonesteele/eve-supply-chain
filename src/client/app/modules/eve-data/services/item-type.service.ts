import { Injectable } from '@angular/core';
import { LogService } from '../../core/services/logging/log.service';
import { EveStaticDataService } from './eve-static-data.service';
import { Observable } from 'rxjs/Observable';
import { ItemType } from '../eve-data-types';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { ItemGroupService } from './item-group.service';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ItemMetaTypeService } from './item-meta-type.service';

/**
 * Service for querying item type names.
 */
@Injectable()
export class ItemTypeService {
  private types = new ReplaySubject<Map<number, ItemType>>(1);

  constructor(dataService: EveStaticDataService,
              public log: LogService,
              private translate: TranslateService,
              private itemGroupService: ItemGroupService,
              private itemMetaTypeService: ItemMetaTypeService) {
    const vm = this;
    dataService.get('fsd/typeIDs.json').subscribe(json => {
      let typeObs: Observable<ItemType>[] = [];
      for (const typeId in json) {
        typeObs.push(vm.translateItemType(typeId, json[typeId]));
      }
      forkJoin(typeObs).subscribe(
        (it) => {
          let typeMap: Map<number, ItemType> = new Map<number, ItemType>();
          for (const type of it) {
            typeMap.set(type.id, type);
          }
          return vm.types.next(typeMap);
        },
        (err) => vm.types.error(err),
        () => vm.types.complete()
      );
    });
  }

  /**
   * Retrieves an item name by ID number.
   * @param {number} id
   * @returns {Observable<string>}
   */
  getType(id: number): Observable<ItemType> {
    return this.types.map(types => types.get(id));
  }

  /**
   * Retrieves a list of item names by list of ID number.
   * @param {number[]} typeIds
   * @returns {Observable<ItemType[]>}
   */
  getTypes(typeIds: number[]): Observable<ItemType[]> {
    return this.types.map(types => {
      let retval: ItemType[] = [];
      for (const typeId of typeIds) {
        retval.push(types.get(typeId));
      }
      return retval;
    });
  }

  /**
   * Translates Eve static data into app internal format.
   * @param id item type id
   * @param json item type static data element
   * @returns {Observable<ItemType>}
   */
  private translateItemType(id: string, json: any): Observable<ItemType> {
    return forkJoin([
      Observable.of(json),
      this.itemGroupService.getGroup(json.groupID),
      this.itemMetaTypeService.getMetaType(Number(id))
    ], (json, group, metaType) => {
      return Object.assign({}, json, {
        id: Number(id),
        name: json.name[this.translate.currentLang] ? json.name[this.translate.currentLang] : json.name['en'],
        group: group,
        metaType: metaType
      });
    });
  }
}
