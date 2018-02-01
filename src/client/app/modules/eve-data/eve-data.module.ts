// angular
import { NgModule } from '@angular/core';

// lib

// module
import { EVE_DATA_PROVIDERS } from './services/index';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
  ],
  providers: [
    ...EVE_DATA_PROVIDERS
  ]
})
export class EveDataModule {
}
