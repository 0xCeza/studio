import { Injectable, Inject } from '@nestjs/common';

import { IAppToolkit, APP_TOOLKIT } from '~app-toolkit/app-toolkit.interface';
import { ContractFactory } from '~contract/contracts';
import { Network } from '~types/network.interface';

import { Vghst__factory } from './ethers';
import { Vqi__factory } from './ethers';
import { Vvghst__factory } from './ethers';

// eslint-disable-next-line
type ContractOpts = { address: string; network: Network };

@Injectable()
export class GotchiVaultContractFactory extends ContractFactory {
  constructor(@Inject(APP_TOOLKIT) protected readonly appToolkit: IAppToolkit) {
    super((network: Network) => appToolkit.getNetworkProvider(network));
  }

  vghst({ address, network }: ContractOpts) {
    return Vghst__factory.connect(address, this.appToolkit.getNetworkProvider(network));
  }
  vqi({ address, network }: ContractOpts) {
    return Vqi__factory.connect(address, this.appToolkit.getNetworkProvider(network));
  }
  vvghst({ address, network }: ContractOpts) {
    return Vvghst__factory.connect(address, this.appToolkit.getNetworkProvider(network));
  }
}

export type { Vghst } from './ethers';
export type { Vqi } from './ethers';
export type { Vvghst } from './ethers';
