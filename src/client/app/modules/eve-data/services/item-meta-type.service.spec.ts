// angular
import { TestBed } from '@angular/core/testing';
// app
import { t } from '../../test/index';
import { SharedModule } from '../../shared/shared.module';
import { ItemMetaTypeService } from './item-meta-type.service';

// libs

// module

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [
      SharedModule
    ],
    providers: [
      ItemMetaTypeService
    ]
  });
};

export function main() {
  t.describe('eve-data:', () => {

    t.be(testModuleConfig);

    t.describe('ItemMetaTypeService', () => {

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
