import { Register } from '~app-toolkit/decorators';
import { appDefinition, AppDefinition } from '~app/app.definition';
import { AppAction, AppTag, GroupType } from '~app/app.interface';
import { Network } from '~types/network.interface';

export const GOTCHI_VAULT_DEFINITION = appDefinition({
  id: 'gotchi-vault',
  name: 'Gotchi Vault',
  description: 'Deposit your Aavegotchis and GHST tokens into the Vault to passively maximize their yield.',
  url: 'www.gotchivault.com',

  groups: {
    vghst: {
      id: 'vghst',
      type: GroupType.TOKEN,
      label: 'vGHST',
    },

    vvghst: {
      id: 'vvghst',
      type: GroupType.TOKEN,
      label: 'vvGHST',
    },

    vqi: {
      id: 'vqi',
      type: GroupType.TOKEN,
      label: 'vQi',
    },
  },

  tags: [AppTag.ASSET_MANAGEMENT, AppTag.FUND_MANAGER, AppTag.GAMING, AppTag.NFT_LENDING],

  keywords: [],

  links: {
    twitter: 'https://twitter.com/GotchiVault',
    discord: 'https://discord.gg/z9Q8vjYPQX',
    learn: 'https://docs.gotchivault.com/',
  },

  supportedNetworks: {
    [Network.POLYGON_MAINNET]: [AppAction.VIEW],
  },

  primaryColor: '#ff00ff',
});

@Register.AppDefinition(GOTCHI_VAULT_DEFINITION.id)
export class GotchiVaultAppDefinition extends AppDefinition {
  constructor() {
    super(GOTCHI_VAULT_DEFINITION);
  }
}

export default GOTCHI_VAULT_DEFINITION;
