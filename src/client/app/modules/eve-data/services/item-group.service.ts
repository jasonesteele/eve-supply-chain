import { Injectable } from '@angular/core';
import { LogService } from '../../core/services/logging/log.service';
import { EveStaticDataService } from './eve-static-data.service';
import { Observable } from 'rxjs/Observable';
import { ItemGroup, ItemType } from '../eve-data-types';
import { TranslateService } from '@ngx-translate/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { forkJoin } from 'rxjs/observable/forkJoin';

/**
 * Service for querying item groups.
 */
@Injectable()
export class ItemGroupService {
  private groups = new ReplaySubject<Map<number, ItemGroup>>(1);

  constructor(dataService: EveStaticDataService,
              public log: LogService,
              private translate: TranslateService) {
    const vm = this;
    dataService.get('fsd/groupIDs.json').subscribe(json => {
      let typeObs: Observable<ItemGroup>[] = [];
      for (const groupId in json) {
        typeObs.push(vm.translateItemGroup(groupId, json[groupId]));
      }
      forkJoin(typeObs).subscribe(
        (it) => {
          let groupMap: Map<number, ItemGroup> = new Map<number, ItemGroup>();
          for (const group of it) {
            groupMap.set(group.id, group);
          }
          return vm.groups.next(groupMap);
        },
        (err) => vm.groups.error(err),
        () => vm.groups.complete()
      );
    });
  }

  /**
   * Retrieves an item group by ID number.
   * @param {number} id
   * @returns {Observable<string>}
   */
  getGroup(id: number): Observable<ItemGroup> {
    return this.groups.map(types => types.get(id));
  }

  /**
   * Translates Eve static data into app internal format.
   * @param id item group id
   * @param json item group static data element
   * @returns {Observable<ItemGroup>}
   */
  private translateItemGroup(id: string, json: any): Observable<ItemGroup> {
    return forkJoin([
      Observable.of(json)
    ], (json, group) => {
      return Object.assign({}, json, {
        id: Number(id),
        name: json.name[this.translate.currentLang] ? json.name[this.translate.currentLang] : json.name['en']
      });
    });
  }
}
