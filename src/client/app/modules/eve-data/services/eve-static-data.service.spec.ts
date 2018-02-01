// angular
import { TestBed } from '@angular/core/testing';
// app
import { t } from '../../test/index';
import { EveStaticDataService } from './eve-static-data.service';
import { SharedModule } from '../../shared/shared.module';

// libs

// module

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [
      SharedModule
    ],
    providers: [
      EveStaticDataService
    ]
  });
};

export function main() {
  t.describe('eve-data:', () => {

    t.be(testModuleConfig);

    t.describe('EveStaticDataService', () => {

      t.it('compiles', () => {
        t.async(() => {
          TestBed.compileComponents()
            .then(() => {
              // TODO - real unit test
            });
        });
      });
    });
  });
}
