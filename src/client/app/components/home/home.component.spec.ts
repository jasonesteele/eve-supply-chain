// angular
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
// libs
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { t } from '../../modules/test/index';
import { NameListService, reducer, SampleEffects } from '../../modules/sample/index';
import { CoreModule } from '../../modules/core/core.module';
import { AnalyticsModule } from '../../modules/analytics/analytics.module';
import { MultilingualModule } from '../../modules/i18n/multilingual.module';
import { LanguageProviders } from '../../modules/i18n/index';
import { SharedModule } from '../../modules/shared/index';
import { HomeComponent } from './home.component';
import { consoleLogTarget } from '../../../web.module';
import { ConsoleService, LogTarget } from '../../modules/core/services/index';
import { ApiModule } from '../../modules/esi-client/api.module';
import { HttpClientModule } from '@angular/common/http';
import { EveDataModule } from '../../modules/eve-data/eve-data.module';

// test module configuration for each test
const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [
      CoreModule.forRoot([
        {provide: LogTarget, useFactory: (consoleLogTarget), deps: [ConsoleService], multi: true}
      ]),
      SharedModule,
      RouterTestingModule,
      HttpClientModule,
      AnalyticsModule,
      MultilingualModule,
      StoreModule.provideStore({sample: reducer}),
      EffectsModule.run(SampleEffects),
      ApiModule,
      EveDataModule
    ],
    declarations: [HomeComponent, TestComponent],
    providers: [
      LanguageProviders,
      NameListService,
      BaseRequestOptions,
      MockBackend,
      {
        provide: Http, useFactory: function (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
          return new Http(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      }
    ]
  });
};

export function main() {
  t.describe('@Component: HomeComponent', () => {

    t.be(testModuleConfig);

    t.it('should work',
      t.async(() => {
        TestBed.compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            fixture.detectChanges();

            let homeInstance = fixture.debugElement.children[0].componentInstance;
            let homeDOMEl = fixture.debugElement.children[0].nativeElement;

            t.e(homeDOMEl.querySelectorAll('li').length).toEqual(0);

            homeInstance.newName = 'Minko';
            homeInstance.addName();

            fixture.detectChanges();

            t.e(homeDOMEl.querySelectorAll('li').length).toEqual(1);
            t.e(homeDOMEl.querySelectorAll('li')[0].textContent).toEqual('Minko');
          });
      }));
  });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-home></sd-home>'
})
class TestComponent {

}
