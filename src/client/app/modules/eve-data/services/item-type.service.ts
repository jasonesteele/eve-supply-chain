import { Injectable } from '@angular/core';
import { LogService } from '../../core/services/logging/log.service';
import { EveStaticDataService } from './eve-static-data.service';
import { Observable } from 'rxjs/Observable';
import { ItemType } from '../eve-data-types';

/**
 * Service for querying item type names.
 */
@Injectable()
export class ItemTypeService {
  private types: Observable<any>;

  constructor(dataService: EveStaticDataService,
              public log: LogService) {
    this.types = dataService.get('fsd/typeIDs.json').publishReplay(1).refCount();
  }

  /**
   * Retrieves an item name by ID number.
   * @param {number} id
   * @returns {Observable<string>}
   */
  getType(id: number): Observable<ItemType> {
    return this.types.map(it => it[id]);
  }

  /**
   * Retrieves a list of item names by list of ID number.
   * @param {number[]} ids
   * @returns {Observable<ItemType[]>}
   */
  getTypes(ids: number[]): Observable<ItemType[]> {
    return this.types.map(json => {
      let types: ItemType[] = [];
      for (let id of ids) {
        if (!json[id]) {
          types.push(undefined);
        } else {
          types.push(Object.assign({id: id}, json[id]));
        }
      }
      return types;
    });
  }
}
