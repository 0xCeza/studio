import { Inject } from '@nestjs/common';

import { IAppToolkit, APP_TOOLKIT } from '~app-toolkit/app-toolkit.interface';
import { Register } from '~app-toolkit/decorators';
import { PositionFetcher } from '~position/position-fetcher.interface';
import { AppTokenPosition } from '~position/position.interface';
import { Network } from '~types/network.interface';

import { GotchiVaultContractFactory } from '../contracts';
import { GOTCHI_VAULT_DEFINITION } from '../gotchi-vault.definition';

const appId = GOTCHI_VAULT_DEFINITION.id;
const groupId = GOTCHI_VAULT_DEFINITION.groups.vqi.id;
const network = Network.POLYGON_MAINNET;

@Register.TokenPositionFetcher({ appId, groupId, network })
export class PolygonGotchiVaultVqiTokenFetcher implements PositionFetcher<AppTokenPosition> {
  constructor(
    @Inject(APP_TOOLKIT) private readonly appToolkit: IAppToolkit,
    @Inject(GotchiVaultContractFactory) private readonly gotchiVaultContractFactory: GotchiVaultContractFactory,
  ) {}

  async getPositions() {
    // #todo
    return [];
  }
}
