import { NativeModules, Platform } from 'react-native';

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

enum BladeEnv {
  Prod = 'Prod',
  CI = 'CI',
}

enum Network {
  Testnet = 'Testnet',
  Mainnet = 'Mainnet',
}

interface InfoData {
  apiKey: string;
  dAppCode: string;
  network: string;
  visitorId: string;
  sdkEnvironment: string;
  sdkVersion: string;
  nonce: number;
}

interface CreatedAccountData {
  seedPhrase: string;
  publicKey: string;
  privateKey: string;
  accountId?: string;
  evmAddress: string;
  transactionId?: string;
  status: string;
  queueNumber: number;
}

interface SignMessageData {
  signedMessage: string;
}

class ReactBladeSDK {
  static async initialize(
    apiKey: string,
    dAppCode: string,
    network: Network,
    bladeEnv: BladeEnv,
    force: boolean
  ): Promise<InfoData> {
    return BladeSdk.initialize(apiKey, dAppCode, network, bladeEnv, force).then(
      (result: string) => {
        return JSON.parse(result);
      }
    );
  }

  static async createAccount(
    privateKey: string,
    deviceId: string
  ): Promise<CreatedAccountData> {
    return BladeSdk.createAccount(privateKey, deviceId).then(
      (result: string) => {
        return JSON.parse(result);
      }
    );
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
export type { InfoData, CreatedAccountData };
export { BladeEnv, Network };
