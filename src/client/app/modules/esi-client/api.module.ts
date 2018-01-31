import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AllianceService } from './api/alliance.service';
import { AssetsService } from './api/assets.service';
import { BookmarksService } from './api/bookmarks.service';
import { CalendarService } from './api/calendar.service';
import { CharacterService } from './api/character.service';
import { ClonesService } from './api/clones.service';
import { ContactsService } from './api/contacts.service';
import { ContractsService } from './api/contracts.service';
import { CorporationService } from './api/corporation.service';
import { DogmaService } from './api/dogma.service';
import { FactionWarfareService } from './api/factionWarfare.service';
import { FittingsService } from './api/fittings.service';
import { FleetsService } from './api/fleets.service';
import { IncursionsService } from './api/incursions.service';
import { IndustryService } from './api/industry.service';
import { InsuranceService } from './api/insurance.service';
import { KillmailsService } from './api/killmails.service';
import { LocationService } from './api/location.service';
import { LoyaltyService } from './api/loyalty.service';
import { MailService } from './api/mail.service';
import { MarketService } from './api/market.service';
import { OpportunitiesService } from './api/opportunities.service';
import { PlanetaryInteractionService } from './api/planetaryInteraction.service';
import { RoutesService } from './api/routes.service';
import { SearchService } from './api/search.service';
import { SkillsService } from './api/skills.service';
import { SovereigntyService } from './api/sovereignty.service';
import { StatusService } from './api/status.service';
import { UniverseService } from './api/universe.service';
import { UserInterfaceService } from './api/userInterface.service';
import { WalletService } from './api/wallet.service';
import { WarsService } from './api/wars.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AllianceService,
    AssetsService,
    BookmarksService,
    CalendarService,
    CharacterService,
    ClonesService,
    ContactsService,
    ContractsService,
    CorporationService,
    DogmaService,
    FactionWarfareService,
    FittingsService,
    FleetsService,
    IncursionsService,
    IndustryService,
    InsuranceService,
    KillmailsService,
    LocationService,
    LoyaltyService,
    MailService,
    MarketService,
    OpportunitiesService,
    PlanetaryInteractionService,
    RoutesService,
    SearchService,
    SkillsService,
    SovereigntyService,
    StatusService,
    UniverseService,
    UserInterfaceService,
    WalletService,
    WarsService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        }
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
