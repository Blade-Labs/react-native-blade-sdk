import { NativeModules, Platform } from 'react-native';
import { Network } from './models/Networks';
import { BladeEnv } from './models/Common';
import type {
  BalanceData,
  CreateAccountData,
  InfoData,
  SignMessageData,
  TransactionReceiptData,
  TransactionsHistoryData,
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
  InfoData,
  CreateAccountData,
  BalanceData,
  TransactionsHistoryData,
  SignMessageData,
};
export { BladeEnv, Network };
