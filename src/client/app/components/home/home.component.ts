// libs
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
// app
import { RouterExtensions } from '../../modules/core/index';
import { getNames, IAppState } from '../../modules/ngrx/index';
import { CharacterService } from '../../modules/esi-client/api/character.service';
import { LogService } from '../../modules/core/services/logging/log.service';
import { EveStaticDataService } from '../../modules/eve-data/services/eve-static-data.service';
import { ItemTypeService } from '../../modules/eve-data/services/item-type.service';
import { BlueprintService } from '../../modules/eve-data/services/blueprint.service';

@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
  public names$: Observable<any>;
  public newName: string;

  constructor(private store: Store<IAppState>,
              public routerext: RouterExtensions,
              public log: LogService,
              private characterService: CharacterService,
              private itemTypeService: ItemTypeService,
              private blueprintService: BlueprintService,
              private dataService: EveStaticDataService) {
  }

  ngOnInit() {
    this.names$ = this.store.let(getNames);
    this.newName = '';

  }

  /*
   * @param newname  any text as input.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    const vm = this;

    vm.log.info('running test...');

    //
    // this.characterService.getCharactersCharacterId(2113645220, 'tranquility', 'Eve Supply Chain').subscribe(val => {
    //   this.log.info('retrieved character', val);
    // }, err => {
    //   this.log.error('error retrieving character', err);
    // });

    this.blueprintService.getBlueprints().subscribe(
      it => vm.log.info('getBlueprints(): next', it),
      err => vm.log.error('getBlueprints(): error', err),
      () => vm.log.info('getBlueprints(): complete')
    );
    return false;
  }

  readAbout() {
    // Try this in the {N} app
    // {N} can use these animation options
    this.routerext.navigate(['/about'], {
      transition: {
        duration: 1000,
        name: 'slideTop',
      }
    });
  }
}
