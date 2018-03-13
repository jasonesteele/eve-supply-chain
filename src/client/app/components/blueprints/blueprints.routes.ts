import { BlueprintsComponent } from './blueprints.component';

export const BlueprintsRoutes: Array<any> = [
  {
    path: 'blueprints',
    component: BlueprintsComponent,
    data: {
      title: 'Blueprint Browser',
      description: 'Blueprints, reaction formulas and sleeper relics',
      iconClass: 'eve-icon eve-bpo'
    }
  }
];
