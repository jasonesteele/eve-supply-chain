// app
import { EveStaticDataService } from './eve-static-data.service';
import { BlueprintService } from './blueprints.service';

export const EVE_DATA_PROVIDERS: Array<any> = [
  EveStaticDataService,
  BlueprintService
];

// services
export * from './eve-static-data.service';
export * from './blueprints.service';
