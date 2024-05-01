import { NativeModules, Platform } from 'react-native';
import { Network } from './models/Networks';
import { BladeEnv, CryptoFlowServiceStrategy } from './models/Common';
import type {
  BalanceData,
  CreateAccountData,
  InfoData,
  SignMessageData,
  TransactionReceiptData,
  TransactionsHistoryData,
  CoinInfoData,
  CoinListData,
  SwapQuotesData,
  IntegrationUrlData,
} from './models/Common';

const LINKING_ERROR =
  `The package 'react-native-blade-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const BladeSdk = NativeModules.BladeSdk
  ? NativeModules.BladeSdk
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

class ReactBladeSDK {
  static async initialize(
    apiKey: string,
    dAppCode: string,
    network: Network,
    bladeEnv: BladeEnv,
    force: boolean
  ): Promise<InfoData> {
    return BladeSdk.initialize(apiKey, dAppCode, network, bladeEnv, force).then(
      JSON.parse
    );
  }

  static async getInfo(): Promise<InfoData> {
    return BladeSdk.getInfo().then(JSON.parse);
  }

  static async createAccount(
    privateKey: string,
    deviceId: string
  ): Promise<CreateAccountData> {
    return BladeSdk.createAccount(privateKey, deviceId).then(JSON.parse);
  }

  static async associateToken(
    tokenId: string,
    accountId: string,
    accountPrivateKey: string
  ): Promise<TransactionReceiptData> {
    return BladeSdk.associateToken(tokenId, accountId, accountPrivateKey).then(
      JSON.parse
    );
  }

  static async deleteAccount(
    deleteAccountId: string,
    deletePrivateKey: string,
    transferAccountId: string,
    operatorAccountId: string,
    operatorPrivateKey: string
  ): Promise<TransactionReceiptData> {
    return BladeSdk.deleteAccount(
      deleteAccountId,
      deletePrivateKey,
      transferAccountId,
      operatorAccountId,
      operatorPrivateKey
    ).then(JSON.parse);
  }

  static async getBalance(accountId: string): Promise<BalanceData> {
    return BladeSdk.getBalance(accountId).then(JSON.parse);
  }

  static async getTransactions(
    accountId: string,
    transactionType: string = '',
    nextPage: string = '',
    transactionsLimit: number = 10
  ): Promise<TransactionsHistoryData> {
    return BladeSdk.getTransactions(
      accountId,
      transactionType,
      nextPage,
      transactionsLimit
    ).then(JSON.parse);
  }

  static async getCoinList(): Promise<CoinListData> {
    return BladeSdk.getCoinList().then(JSON.parse);
  }

  static async getCoinPrice(
    search: string,
    currency: string = 'usd'
  ): Promise<CoinInfoData> {
    return BladeSdk.getCoinPrice(search, currency).then(JSON.parse);
  }

  static async exchangeGetQuotes(
    sourceCode: string,
    sourceAmount: number,
    targetCode: string,
    strategy: CryptoFlowServiceStrategy
  ): Promise<SwapQuotesData> {
    return BladeSdk.exchangeGetQuotes(
      sourceCode,
      sourceAmount,
      targetCode,
      strategy
    ).then(JSON.parse);
  }

  static async getTradeUrl(
    strategy: CryptoFlowServiceStrategy,
    accountId: string,
    sourceCode: string,
    sourceAmount: number,
    targetCode: string,
    slippage: number,
    serviceId: string,
    redirectUrl: string = ''
  ): Promise<IntegrationUrlData> {
    return BladeSdk.getTradeUrl(
      strategy,
      accountId,
      sourceCode,
      sourceAmount,
      targetCode,
      slippage,
      serviceId,
      redirectUrl
    ).then(JSON.parse);
  }

  static async sign(
    messageString: string,
    privateKey: string
  ): Promise<SignMessageData> {
    return BladeSdk.sign(messageString, privateKey).then((result: string) => {
      return JSON.parse(result);
    });
  }
}

export default ReactBladeSDK;
export type {
  BalanceData,
  CreateAccountData,
  InfoData,
  SignMessageData,
  TransactionReceiptData,
  TransactionsHistoryData,
  CoinInfoData,
  CoinListData,
  SwapQuotesData,
  IntegrationUrlData,
};
export { BladeEnv, Network, CryptoFlowServiceStrategy };
