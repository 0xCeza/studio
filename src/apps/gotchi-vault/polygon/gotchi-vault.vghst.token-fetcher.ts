import { Inject } from '@nestjs/common';

import { IAppToolkit, APP_TOOLKIT } from '~app-toolkit/app-toolkit.interface';
import { Register } from '~app-toolkit/decorators';
import { getTokenImg } from '~app-toolkit/helpers/presentation/image.present';
import { ContractType } from '~position/contract.interface';
import { PositionFetcher } from '~position/position-fetcher.interface';
import { AppTokenPosition } from '~position/position.interface';
import { Network } from '~types/network.interface';

import { GotchiVaultContractFactory } from '../contracts';
import { GOTCHI_VAULT_DEFINITION } from '../gotchi-vault.definition';

const appId = GOTCHI_VAULT_DEFINITION.id;
const groupId = GOTCHI_VAULT_DEFINITION.groups.vghst.id;
const network = Network.POLYGON_MAINNET;

const tokenAddress = '0x51195e21BDaE8722B29919db56d95Ef51FaecA6C';
const underlyingAddress = '0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7';

@Register.TokenPositionFetcher({ appId, groupId, network })
export class PolygonGotchiVaultVghstTokenFetcher implements PositionFetcher<AppTokenPosition> {
  constructor(
    @Inject(APP_TOOLKIT) private readonly appToolkit: IAppToolkit,
    @Inject(GotchiVaultContractFactory) private readonly gotchiVaultContractFactory: GotchiVaultContractFactory,
  ) {}

  async getPositions() {
    const multicall = this.appToolkit.getMulticall(network);
    const baseTokens = await this.appToolkit.getBaseTokenPrices(network);

    // Instantiate a smart contract instance pointing to the token address
    const contract = this.gotchiVaultContractFactory.vghst({ address: tokenAddress, network });

    // Request the symbol, decimals, ands supply for the token
    const [symbol, decimals, supplyRaw] = await Promise.all([
      multicall.wrap(contract).symbol(),
      multicall.wrap(contract).decimals(),
      multicall.wrap(contract).totalSupply(),
    ]);

    // Denormalize the supply
    const supply = Number(supplyRaw) / 10 ** decimals;

    // find the underlying token data
    const underlyingToken = baseTokens.find(v => v.address === underlyingAddress);
    if (!underlyingToken) return null;
    
    // vGHST Value
    const vGhstValue = (await multicall.wrap(contract).convertVGHST(10**18)).toNumber();
    const price = underlyingToken.price * vGhstValue;

    // Display Props
    const label = 'Gotchi Vault vGHST'
    const secondaryLabel = `1 vGHST = ${(vGhstValue/10**18).toFixed(4)} GHST`
    // const statsItems = [{ label: 'Liquidity', value: buildDollarDisplayItem(liquidity) }];
    const images = [getTokenImg(underlyingAddress, network)];

    // Create the token object
    const token: AppTokenPosition = {
      type: ContractType.APP_TOKEN,
      appId,
      groupId,
      address: tokenAddress,
      network,
      symbol,
      decimals,
      supply,
      pricePerShare: vGhstValue,
      price,
      tokens: [underlyingToken],
      dataProps: {},
      displayProps: {
        label,
        secondaryLabel,
        images,
      },
    };
    
    return [token];
  }
}
