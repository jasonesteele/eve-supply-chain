// angular
import { TestBed } from '@angular/core/testing';
// app
import { t } from '../../test/index';
import { SharedModule } from '../../shared/shared.module';
import { ItemTypeService } from './item-type.service';

// libs

// module

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [
      SharedModule
    ],
    providers: [
      ItemTypeService
    ]
  });
};

export function main() {
  t.describe('eve-data:', () => {

    t.be(testModuleConfig);

    t.describe('ItemTypeService', () => {

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
