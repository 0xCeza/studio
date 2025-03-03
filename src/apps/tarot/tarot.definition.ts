import { Register } from '~app-toolkit/decorators';
import { appDefinition, AppDefinition } from '~app/app.definition';
import { AppAction, AppTag, GroupType } from '~app/app.interface';
import { Network } from '~types/network.interface';

export const TAROT_DEFINITION = appDefinition({
  id: 'tarot',
  name: 'Tarot',
  description: `Leverage your $FTM LP tokens`,
  url: 'https://www.tarot.to/',
  tags: [AppTag.LENDING, AppTag.YIELD_AGGREGATOR],
  groups: {
    collateral: { id: 'collateral', type: GroupType.TOKEN, label: 'Lending Pools', groupLabel: 'Pools' },
    supply: { id: 'supply', type: GroupType.TOKEN, label: 'Rewards', groupLabel: 'Supply' },
    borrow: { id: 'borrow', type: GroupType.POSITION, label: 'Lending Pools', groupLabel: 'Borrow' },
    supplyVault: { id: 'supply-vault', type: GroupType.TOKEN, label: 'Vaults', groupLabel: 'Vault' },
  },
  links: {
    github: 'https://github.com/tarot-finance',
    twitter: 'https://twitter.com/TarotFinance',
    discord: 'https://discord.gg/6ByFHBjqE8',
    medium: 'https://tarotfinance.medium.com/',
  },
  supportedNetworks: { [Network.FANTOM_OPERA_MAINNET]: [AppAction.VIEW] },
});

@Register.AppDefinition(TAROT_DEFINITION.id)
export class TarotAppDefinition extends AppDefinition {
  constructor() {
    super(TAROT_DEFINITION);
  }
}
