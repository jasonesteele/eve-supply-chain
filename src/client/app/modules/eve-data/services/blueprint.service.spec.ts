// angular
import { TestBed } from '@angular/core/testing';
// app
import { t } from '../../test/index';
import { BlueprintService } from './blueprint.service';
import { SharedModule } from '../../shared/shared.module';

// libs

// module

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [
      SharedModule
    ],
    providers: [
      BlueprintService
    ]
  });
};

export function main() {
  t.describe('eve-data:', () => {

    t.be(testModuleConfig);

    t.describe('BlueprintsService', () => {

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
