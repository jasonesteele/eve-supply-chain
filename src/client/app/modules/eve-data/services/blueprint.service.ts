import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  BlueprintActivities,
  BlueprintType,
  IndustrialActivity,
  ItemStack,
  ItemType,
  SkillLevel
} from '../eve-data-types';
import { LogService } from '../../core/services/logging/log.service';
import { EveStaticDataService } from './eve-static-data.service';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ItemTypeService } from './item-type.service';

/**
 * Service for querying Eve blueprints.
 */
@Injectable()
export class BlueprintService {
  private blueprints = new ReplaySubject<Map<number, BlueprintType>>(1);

  constructor(public log: LogService,
              private dataService: EveStaticDataService,
              private itemTypeService: ItemTypeService) {
    const vm = this;
    dataService.get('fsd/blueprints.json').subscribe(json => {
      let bpObs: Observable<BlueprintType>[] = [];
      for (const blueprintId in json) {
        bpObs.push(vm.translateBlueprint(json[blueprintId]));
      }
      forkJoin(bpObs).subscribe(
        (it) => {
          let bpMap: Map<number, BlueprintType> = new Map<number, BlueprintType>();
          for (const bp of it) {
            bpMap.set(bp.id, bp);
          }
          return vm.blueprints.next(bpMap)
        },
        (err) => vm.blueprints.error(err),
        () => vm.blueprints.complete()
      );
    });
  }

  /**
   * Gets all blueprints known to Eve.
   * @param {boolean} unpublished true to return unpublished blueprints as well
   * @returns {Observable<BlueprintType[]>}
   */
  public getBlueprints(unpublished?: boolean): Observable<BlueprintType[]> {
    return this.blueprints
      .map(it => {
        return Array.from(it.values()).filter(it => {
          return unpublished || it.published
        });
      });
  }

  /**
   * Translates Eve static data into app internal format.
   * @param json blueprint static data element
   * @returns {Observable<BlueprintType>}
   */
  private translateBlueprint(json: any): Observable<BlueprintType> {
    const vm = this;
    return forkJoin([
      Observable.of(json),
      this.itemTypeService.getType(json.blueprintTypeID),
      this.translateActivity(json.activities.copying),
      this.translateActivity(json.activities.manufacturing),
      this.translateActivity(json.activities.research_material),
      this.translateActivity(json.activities.research_time),
      this.translateActivity(json.activities.invention),
      this.translateActivity(json.activities.reaction),
    ], (json, type, copying, manufacturing, researchMaterial, researchTime, invention, reaction) => {
      let activities: BlueprintActivities = {};
      if (copying) {
        activities.copying = copying;
      }
      if (manufacturing) {
        activities.manufacturing = manufacturing;
      }
      if (researchMaterial) {
        activities.researchMaterial = researchMaterial;
      }
      if (researchTime) {
        activities.researchTime = researchTime;
      }
      if (invention) {
        activities.invention = invention;
      }
      if (reaction) {
        activities.reaction = reaction;
      }
      return Object.assign({}, type, {
        id: json.blueprintTypeID,
        maxProductLimit: json.maxProductionLimit,
        activities: activities
      });
    });
  }

  /**
   * Translates an industrial activity into app internal format.
   * @param json static data element for activity
   * @returns {Observable<IndustrialActivity>}
   */
  private translateActivity(json: any): Observable<IndustrialActivity> {
    return !json ? Observable.of(undefined) : forkJoin([
      Observable.of(json),
      this.translateBom(json.materials),
      this.translateBom(json.products),
      this.translateSkills(json.skills),
    ], (json: any, materials, products, skills) => {
      let activity: IndustrialActivity = {
        time: json.time
      };
      if (materials) {
        Object.assign(activity, {materials: materials});
      }
      if (products) {
        Object.assign(activity, {products: products});
      }
      if (skills) {
        Object.assign(activity, {skills: skills});
      }
      return activity;
    });
  }

  /**
   * Translates a bill of materials to app internal format.
   * @param json static data element for activiti
   * @returns {Observable<ItemStack[]>}
   */
  private translateBom(json: any): Observable<ItemStack[]> {
    if (!json) return Observable.of(undefined);

    return forkJoin([
      Observable.of(json),
      this.itemTypeService.getTypes(json.map(it => it.typeID))
    ], (json: any, types: ItemType[]) => {
      return json.map(it => {
        let type = types.find(typeIt => {
          return typeIt && typeIt.id === it.typeID
        });
        let retval = {
          quantity: it.quantity,
          type: type
        };
        if (it.probability) {
          Object.assign(retval, {probability: it.probability})
        }
        return retval;
      });
    });
  }

  /**
   * Translates list of skill requirements to app internal format.
   * @param json
   * @returns {Observable<SkillLevel[]>}
   */
  private translateSkills(json: any): Observable<SkillLevel[]> {
    if (!json) return Observable.of(undefined);

    return forkJoin([
      Observable.of(json),
      this.itemTypeService.getTypes(json.map(it => it.typeID))
    ], (json: any, types: ItemType[]) => {
      return json.map(it => {
        let type = types.find(typeIt => {
          return typeIt && typeIt.id === it.typeID
        });
        return {
          type: type,
          level: it.level
        }
      });
    });
  }
}
