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
  ResultData,
  SwapResultData,
  TransakOrderInfo,
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
  /**
   * Inits instance of BladeSDK for correct work with Blade API and Hedera network.
   * @param apiKey Unique key for API provided by Blade team.
   * @param dAppCode your dAppCode - request specific one by contacting Bladelabs team
   * @param network Mainnet or Testnet of Hedera network
   * @param bladeEnv optional field to set BladeAPI environment (Prod, CI)
   * @param force field to force init. Will not crash if already initialized
   * @returns {Promise<InfoData>}
   * @example
   * import BladeSdk, { BladeEnv, Network } from '@bladelabs/react-native-blade-sdk';
   *
   * // ...
   *
   * const apiKey = 'reactsdktest';
   * const dAppCode = 'FG9dUBQcBaBAPgCHz7DqmNZzrJyhewAMJytjwp3VFIEMFTXQyVSIDq6wRvtPcSAt';
   * const initResult = await BladeSdk.initialize(apiKey, dAppCode, Network.Testnet, BladeEnv.Prod, true);
   * console.log('initialize:', initResult);
   */
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

  /**
   * This method returns basic params of initialized instance of BladeSDK. This params may useful for support.
   * Returned object likely will contain next fields: `apiKey`, `dAppCode`, `network`, `visitorId`, `sdkEnvironment`, `sdkVersion`, `nonce`
   * In case of support please not provide full apiKey, limit yourself to the part of the code that includes a few characters at the beginning and at the end (eg. `AdR3....BFgd`)
   * @returns {Promise<InfoData>}
   *
   * @example
   * const infoResult = await BladeSdk.getInfo();
   * console.log('getInfo:', infoResult);
   */
  static async getInfo(): Promise<InfoData> {
    return BladeSdk.getInfo().then(JSON.parse);
  }

  /**
   * Create new Hedera account (ECDSA). Only for configured dApps. Depending on dApp config Blade create account, associate tokens, etc.
   * In case of not using pre-created accounts pool and network high load, this method can return transactionId and no accountId.
   * In that case account creation added to queue, and you should wait some time and call `getPendingAccount()` method.
   * @param privateKey optional field if you need specify account key (hex encoded privateKey with DER-prefix)
   * @param deviceId optional field for headers for backend check
   * @returns {Promise<CreateAccountData>}
   * @example
   * const newAccountPrivateKey = '3030020100300706052b8104000a0422042047203b26c99c5f002d3b5c38b6bcd2ab46de8ad3fa90c5a39dcfdc5904dfa9a0';
   * const accountResult = await BladeSdk.createAccount(newAccountPrivateKey, '');
   * console.log('createAccount:', accountResult);
   */
  static async createAccount(
    privateKey: string,
    deviceId: string
  ): Promise<CreateAccountData> {
    return BladeSdk.createAccount(privateKey, deviceId).then(JSON.parse);
  }

  /**
   * Associate token to account. Association fee will be covered by PayMaster, if tokenId configured in dApp
   * @param tokenId token id to associate. Empty to associate all tokens configured in dApp
   * @param accountId account id to associate token
   * @param accountPrivateKey account private key
   * @returns {Promise<TransactionReceiptData>}
   * @example
   * const associateResult = await BladeSdk.associateToken('0.0.1337', '0.0.10001', '3030020100300706052b8104000a0422042047203b26c99c5f002d3b5c38b6bcd2ab46de8ad3fa90c5a39dcfdc5904dfa9a0');
   * console.log('associateResult:', associateResult);
   */
  static async associateToken(
    tokenId: string,
    accountId: string,
    accountPrivateKey: string
  ): Promise<TransactionReceiptData> {
    return BladeSdk.associateToken(tokenId, accountId, accountPrivateKey).then(
      JSON.parse
    );
  }

  /**
   * Delete Hedera account. This method requires account private key and operator private key. Operator is the one who paying fees
   * @param deleteAccountId account id of account to delete (0.0.xxxxx)
   * @param deletePrivateKey account private key (DER encoded hex string)
   * @param transferAccountId if any funds left on account, they will be transferred to this account (0.0.xxxxx)
   * @param operatorAccountId operator account id (0.0.xxxxx). Used for fee
   * @param operatorPrivateKey operator's account private key (DER encoded hex string)
   * @returns {Promise<TransactionReceiptData>}
   * @example
   * const accountResult = await BladeSdk.createAccount('', '');
   * console.log('createAccount:', accountResult);
   *
   * const deleteResult = await BladeSdk.deleteAccount(
   *   accountResult.accountId,
   *   accountResult.privateKey,
   *   operatorAccountId,
   *   operatorAccountId,
   *   operatorPrivateKey
   * );
   * console.log('deleteAccount:', result);
   */
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

  /**
   * Get hbar and token balances for specific account.
   * @param accountId Hedera account id (0.0.xxxxx)
   * @returns {Promise<BalanceData>}
   * @example
   * const balanceResult = await BladeSdk.getBalance('0.0.10001');
   * console.log('getBalance:', balanceResult);
   */
  static async getBalance(accountId: string): Promise<BalanceData> {
    return BladeSdk.getBalance(accountId).then(JSON.parse);
  }

  /**
   * Method to execute Hbar transfers from current account to receiver
   *
   * @param accountId: sender account id (0.0.xxxxx)
   * @param accountPrivateKey: sender's hex-encoded private key with DER-header (302e020100300506032b657004220420...). ECDSA or Ed25519
   * @param amount: amount
   * @param memo: transaction memo (limited to 100 characters)
   * @returns {Promise<TransactionReceiptData>} receipt
   * @example
   * const senderId = '0.0.10001'
   * const senderKey = '302d300706052b8104000a032200029dc73991b0d9cd...'
   * const receiverId = '0.0.10002'
   * const amount = 2.5
   *
   * const transferResult = await BladeSdk.transferHbars(senderId, senderKey, receiverId, amount, "Some memo text");
   * console.log('transferHbars:', transferResult);
   */
  static async transferHbars(
    accountId: string,
    accountPrivateKey: string,
    receiverId: string,
    amount: number,
    memo: string
  ): Promise<TransactionReceiptData> {
    return BladeSdk.transferHbars(
      accountId,
      accountPrivateKey,
      receiverId,
      amount,
      memo
    ).then(JSON.parse);
  }

  /**
   * Method to execute token transfers from current account to receiver
   *
   * @param tokenId: token id to send (0.0.xxxxx)
   * @param accountId: sender account id (0.0.xxxxx)
   * @param accountPrivateKey: sender's hex-encoded private key with DER-header (302e020100300506032b657004220420...). ECDSA or Ed25519
   * @param receiverId: receiver account id (0.0.xxxxx)
   * @param amountOrSerial: amount of fungible tokens to send (with token-decimals correction) on NFT serial number
   * @param memo: transaction memo (limited to 100 characters)
   * @param usePaymaster if true, Paymaster account will pay fee transaction. Only for single dApp configured fungible-token. In that case tokenId not used
   * @returns {Promise<TransactionReceiptData>} receipt
   * @example
   * const tokenId = '0.0.1337'
   * const senderId = '0.0.10001'
   * const senderKey = '302d300706052b8104000a032200029dc73991b0d9cd...'
   * const receiverId = '0.0.10002'
   * const amount = 2.5
   *
   * const transferResult = await BladeSdk.transferTokens(senderId, senderKey, receiverId, amount, "Some memo text");
   * console.log('transferHbars:', transferResult);
   */
  static async transferTokens(
    tokenId: string,
    accountId: string,
    accountPrivateKey: string,
    receiverId: string,
    amountOrSerial: number,
    memo: string,
    usePaymaster: boolean = false
  ): Promise<TransactionReceiptData> {
    return BladeSdk.transferTokens(
      tokenId,
      accountId,
      accountPrivateKey,
      receiverId,
      amountOrSerial,
      memo,
      usePaymaster
    ).then(JSON.parse);
  }

  /**
   * Get transactions history for account. Can be filtered by transaction type.
   * Transaction requested from mirror node. Every transaction requested for child transactions. Result are flattened.
   * If transaction type is not provided, all transactions will be returned.
   * If transaction type is CRYPTOTRANSFERTOKEN records will additionally contain plainData field with decoded data.
   * @param accountId account id to get transactions for (0.0.xxxxx)
   * @param transactionType one of enum MirrorNodeTransactionType or "CRYPTOTRANSFERTOKEN"
   * @param nextPage link to next page of transactions from previous request
   * @param transactionsLimit number of transactions to return. Speed of request depends on this value if transactionType is set.
   * @returns {Promise<TransactionsHistoryData>}
   * @example
   * const transactionsResult = await BladeSdk.getTransactions('0.0.10001');
   * console.log('getTransactions:', transactionsResult);
   */
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

  /**
   * Get list of all available coins on CoinGecko.
   * @returns {Promise<CoinListData>}
   * @example
   * const coinListResult = await BladeSdk.getCoinList();
   * console.log('getCoinList:', coinListResult);
   */
  static async getCoinList(): Promise<CoinListData> {
    return BladeSdk.getCoinList().then(JSON.parse);
  }

  /**
   * Get coin price and coin info from CoinGecko. Search can be coin id or address in one of the coin platforms.
   * @param search coin alias (get one using getCoinList method)
   * @param currency currency to get price in (usd, eur, etc.)
   * @returns {Promise<CoinInfoData>}
   * @example
   * const coinPriceResult = await BladeSdk.getCoinPrice('hbar', 'uah');
   * console.log('getCoinPrice:', coinPriceResult);
   */
  static async getCoinPrice(
    search: string,
    currency: string = 'usd'
  ): Promise<CoinInfoData> {
    return BladeSdk.getCoinPrice(search, currency).then(JSON.parse);
  }

  /**
   * Get quotes from different services for buy, sell or swap
   * @param sourceCode name (HBAR, KARATE, other token code)
   * @param sourceAmount amount to swap, buy or sell
   * @param targetCode name (HBAR, KARATE, USDC, other token code)
   * @param strategy one of enum CryptoFlowServiceStrategy (Buy, Sell, Swap)
   * @returns {Promise<SwapQuotesData>}
   * @example
   * const quotesResult = await BladeSdk.exchangeGetQuotes('USD', 100, 'HBAR', CryptoFlowServiceStrategy.BUY);
   * console.log('exchangeGetQuotes:', quotesResult);
   */
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

  /**
   * Get configured url to buy or sell tokens or fiat
   * @param strategy Buy / Sell
   * @param accountId account id
   * @param sourceCode name (HBAR, KARATE, USDC, other token code)
   * @param sourceAmount amount to buy/sell
   * @param targetCode name (HBAR, KARATE, USDC, other token code)
   * @param slippage slippage in percents. Transaction will revert if the price changes unfavorably by more than this percentage.
   * @param serviceId service id to use (saucerswap, onmeta, etc)
   * @param redirectUrl optional url to redirect after final step
   * @returns {Promise<IntegrationUrlData>}
   * @example
   * const urlResult = await BladeSdk.getTradeUrl(CryptoFlowServiceStrategy.BUY, operatorAccountId, 'USD', 100, 'HBAR', 2, 'moonpay', '');
   * console.log('getTradeUrl:', urlResult);
   */
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

  /**
   * Get exchange order status
   * @param serviceId service id to use for swap (saucerswap, onmeta, etc)
   * @param orderId order id of operation
   * @returns {Promise<TransakOrderInfo>}
   * @example
   * const orderInfo = await BladeSdk.getExchangeStatus('transak', 'abaf28be-609f-49f4-a09a-e8e7ea7c8bd9');
   * console.log('getExchangeStatus:', orderInfo);
   */
  static async getExchangeStatus(
    serviceId: string,
    orderId: string
  ): Promise<TransakOrderInfo> {
    return BladeSdk.getExchangeStatus(serviceId, orderId).then(JSON.parse);
  }

  /**
   * Swap tokens
   * @param accountId: account id
   * @param accountPrivateKey: account private key
   * @param sourceCode: name (HBAR, KARATE, other token code)
   * @param sourceAmount: amount to swap
   * @param targetCode: name (HBAR, KARATE, other token code)
   * @param slippage: slippage in percents. Transaction will revert if the price changes unfavorably by more than this percentage.
   * @param serviceId: service id to use for swap (saucerswap, etc)
   * @returns {Promise<SwapResultData>}
   * @example
   * const swapResult = await BladeSdk.swapTokens('0.0.10001', '302d300706052b8104000a032200029dc73991b0d9cd...', 'USDC', 123.4, 'KARATE', 0.5, 'moonpay');
   * console.log('swapResult:', swapResult);
   */
  static async swapTokens(
    accountId: string,
    accountPrivateKey: string,
    sourceCode: string,
    sourceAmount: number,
    targetCode: string,
    slippage: number,
    serviceId: string
  ): Promise<SwapResultData> {
    return BladeSdk.swapTokens(
      accountId,
      accountPrivateKey,
      sourceCode,
      sourceAmount,
      targetCode,
      slippage,
      serviceId
    ).then(JSON.parse);
  }

  /**
   * Sign base64-encoded message with private key. Returns hex-encoded signature.
   * @param messageString base64-encoded message to sign
   * @param privateKey hex-encoded private key with DER header
   * @returns {Promise<SignMessageData>}
   * @example
   * const signResult = await BladeSdk.sign(
   *   Buffer.from('Hello, World!').toString('base64'),
   *   newAccountPrivateKey
   * );
   * console.log('sign:', signResult);
   */
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
  ResultData,
  SwapResultData,
  TransakOrderInfo,
};
export { BladeEnv, Network, CryptoFlowServiceStrategy };
