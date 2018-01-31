// libs
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
// app
import { RouterExtensions } from '../../modules/core/index';
import { getNames, IAppState } from '../../modules/ngrx/index';
import { NameList } from '../../modules/sample/index';
import { CharacterService } from '../../modules/esi-client/api/character.service';
import { LogService } from '../../modules/core/services/logging/log.service';
import { HttpClient } from '@angular/common/http';

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
              private http: HttpClient) {
  }

  ngOnInit() {
    this.names$ = this.store.let(getNames);
    this.newName = '';

    this.http.get('http://localhost:5555/assets/sde/bsd/invNames.json')
      .subscribe(data => {
        this.log.info("skins retrieved from server", data)
      }, err => {
        this.log.error('error retrieving skins', err);
      });

    this.characterService.getCharactersCharacterId(2113645220, 'tranquility', 'Eve Supply Chain').subscribe(val => {
      this.log.info('retrieved character', val);
    }, err => {
      this.log.error('error retrieving character', err);
    });
  }

  /*
   * @param newname  any text as input.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    this.store.dispatch(new NameList.AddAction(this.newName));
    this.newName = '';
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
