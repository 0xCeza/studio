import { Register } from '~app-toolkit/decorators';
import { AbstractApp } from '~app/app.dynamic-module';

import { GotchiVaultContractFactory } from './contracts';
import { GotchiVaultAppDefinition, GOTCHI_VAULT_DEFINITION } from './gotchi-vault.definition';
import { PolygonGotchiVaultVghstTokenFetcher } from './polygon/gotchi-vault.vghst.token-fetcher';
import { PolygonGotchiVaultVqiTokenFetcher } from './polygon/gotchi-vault.vqi.token-fetcher';
import { PolygonGotchiVaultVvghstTokenFetcher } from './polygon/gotchi-vault.vvghst.token-fetcher';

@Register.AppModule({
  appId: GOTCHI_VAULT_DEFINITION.id,
  providers: [
    GotchiVaultAppDefinition,
    GotchiVaultContractFactory,
    PolygonGotchiVaultVghstTokenFetcher,
    PolygonGotchiVaultVqiTokenFetcher,
    PolygonGotchiVaultVvghstTokenFetcher,
  ],
})
export class GotchiVaultAppModule extends AbstractApp() {}
