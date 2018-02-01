import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Blueprint, IndustrialActivity, ItemStack } from '../eve-data-types';
import { LogService } from '../../core/services/logging/log.service';
import { EveStaticDataService } from './eve-static-data.service';
import { Subject } from 'rxjs/Subject';

/**
 * Service for querying Eve blueprints.
 */
@Injectable()
export class BlueprintService {
  constructor(public log: LogService,
              private dataService: EveStaticDataService) {
  }

  /**
   * Gets all blueprints known to Eve.
   * @param {boolean} unpublished true to return unpublished blueprints as well
   * @returns {Observable<Blueprint[]>}
   */
  public getBlueprints(unpublished?: boolean): Observable<Blueprint[]> {
    let retval = new Subject<Blueprint[]>();
    this.dataService.get('fsd/blueprints.json').subscribe(data => {
      let blueprints: Blueprint[] = [];
      for (let key in data) {
        blueprints.push(this.translateBlueprint(data[key]));
      }
      retval.next(blueprints);
    }, error => {
      this.log.error('error loading blueprint static data', error);
    });
    return retval;
  }

  /**
   * Retrieves a blueprint by blueprint id.
   * @param {number} id blueprint type identifier
   * @returns {Observable<Blueprint>}
   */
  public findById(id: number): Observable<Blueprint> {
    let retval = new Subject<Blueprint>();
    this.dataService.get('bsd/invNames.json').subscribe(data => {
      let json = data.find(it => it.blueprintTypeID === id);
      if (json) {
        retval.next(this.translateBlueprint(json));
      } else {
        retval.error(`blueprint id ${id} not found}`);
      }
    }, error => {
      this.log.error('error loading blueprint static data', error);
    });
    return retval;
  }

  /**
   * Retrieves a list of blueprints partially matching the given name.
   * @param {string} pattern blueprint name pattern
   * @param {boolean} unpublished true to return unpublished blueprints as well
   * @returns {Observable<Blueprint[]>}
   */
  public findByName(pattern: string, unpublished?: boolean): Observable<Blueprint[]> {
    let retval = new Subject<Blueprint[]>();
    this.dataService.get('fsd/blueprints.json').subscribe(data => {
      let blueprints: Blueprint[] = [];
      for (let key in data) {
        let blueprint = this.translateBlueprint(data[key]);
        if (blueprint.name.toLowerCase().indexOf(pattern.toLowerCase()) != -1) {
          blueprints.push(blueprint);
        }
      }
      retval.next(blueprints);
    }, error => {
      this.log.error('error loading blueprint static data', error);
    });
    return retval;
  }

  /**
   * Finds the blueprint that manufactures a product.
   * @param {string} id product id
   * @returns {Observable<Blueprint[]>}
   */
  public findByProductId(id: number): Observable<Blueprint[]> {
    let retval = new Subject<Blueprint[]>();
    this.dataService.get('fsd/blueprints.json').subscribe(data => {
      let blueprints: Blueprint[] = [];
      for (let key in data) {
        let blueprint = this.translateBlueprint(data[key]);
        if (blueprint.activities.manufacturing
          && blueprint.activities.manufacturing.products.filter(it => it.type.id === id).length > 0) {
          blueprints.push(blueprint);
        }
      }
      retval.next(blueprints);
    }, error => {
      this.log.error('error loading blueprint static data', error);
    });
    return retval;
  }

  /**
   * Translates Eve static data into app internal format.
   * @param json blueprint static data element
   * @returns {Blueprint}
   */
  private translateBlueprint(json: any): Blueprint {
    let blueprint: Blueprint = {
      id: json.blueprintTypeID,
      name: 'BLUEPRINT',  // TODO get item type name
      maxProductLimit: json.maxProductionLimit,
      activities: {}
    };

    if (json.activities.hasOwnProperty('copying')) {
      blueprint.activities.copying = this.translateActivity(json.activities.copying);
    }
    if (json.activities.hasOwnProperty('manufacturing')) {
      blueprint.activities.manufacturing = this.translateActivity(json.activities.manufacturing);
    }
    if (json.activities.hasOwnProperty('research_material')) {
      blueprint.activities.researchMaterial = this.translateActivity(json.activities.research_material);
    }
    if (json.activities.hasOwnProperty('invention')) {
      blueprint.activities.invention = this.translateActivity(json.activities.invention);
    }
    return blueprint;
  }

  private translateActivity(json: any): IndustrialActivity {
    let activity: IndustrialActivity = {
      time: json.time
    };

    if (json.hasOwnProperty('materials')) {
      activity.materials = json.materials.map(it => {
        return {
          quantity: it.quantity,
          type: {
            id: it.typeID,
            name: 'MATERIAL' // TODO get item type name
          }
        }
      });
    }
    if (json.hasOwnProperty('products')) {
      activity.products = json.products.map(it => {
        let product: ItemStack = {
          quantity: it.quantity,
          type: {
            id: it.typeID,
            name: 'PRODUCT' // TODO get item type name
          }
        };
        if (it.hasOwnProperty('probability')) {
          product.probability = it.probability;
        }
        return product;
      });
    }
    if (json.hasOwnProperty('skills')) {
      activity.skills = json.skills.map(it => {
        return {
          quantity: it.quantity,
          type: {
            id: it.typeID,
            name: 'SKILL', // TODO get item type name
            level: it.level
          }
        }
      });
    }

    return activity;
  }
}
