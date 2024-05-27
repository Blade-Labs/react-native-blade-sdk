# Contents

* [initialize](usage.md#initialize)
* [getInfo](usage.md#getinfo)
* [createAccount](usage.md#createaccount)
* [associateToken](usage.md#associatetoken)
* [deleteAccount](usage.md#deleteaccount)
* [getBalance](usage.md#getbalance)
* [getTransactions](usage.md#gettransactions)
* [getCoinList](usage.md#getcoinlist)
* [getCoinPrice](usage.md#getcoinprice)
* [exchangeGetQuotes](usage.md#exchangegetquotes)
* [getTradeUrl](usage.md#gettradeurl)
* [sign](usage.md#sign)

# Methods

## initialize

Inits instance of BladeSDK for correct work with Blade API and Hedera network.

`initialize(
    apiKey: string, 
    dAppCode: string, 
    network: Network, 
    bladeEnv: BladeEnv, 
    force: boolean): Promise<InfoData>`

#### Parameters

| Name | Type | Description |
|------|------| ----------- |
| `apiKey` | `string` | Unique key for API provided by Blade team. |
| `dAppCode` | `string` | your dAppCode - request specific one by contacting Bladelabs team |
| `network` | `Network` | Mainnet or Testnet of Hedera network |
| `bladeEnv` | `BladeEnv` | optional field to set BladeAPI environment (Prod, CI) |
| `force` | `boolean` | field to force init. Will not crash if already initialized |

#### Returns

`Promise<InfoData>`

#### Example

```javascript
import BladeSdk, { BladeEnv, Network } from '@bladelabs/react-native-blade-sdk';

// ...

const apiKey = 'reactsdktest';
const dAppCode = 'FG9dUBQcBaBAPgCHz7DqmNZzrJyhewAMJytjwp3VFIEMFTXQyVSIDq6wRvtPcSAt';
const initResult = await BladeSdk.initialize(apiKey, dAppCode, Network.Testnet, BladeEnv.Prod, true);
console.log('initialize:', initResult);
```

## getInfo

This method returns basic params of initialized instance of BladeSDK. This params may useful for support.

Returned object likely will contain next fields: `apiKey`, `dAppCode`, `network`, `visitorId`, `sdkEnvironment`, `sdkVersion`, `nonce`

In case of support please not provide full apiKey, limit yourself to the part of the code that includes a few characters at the beginning and at the end (eg. `AdR3....BFgd`)

`getInfo(): Promise<InfoData>`


#### Returns

`Promise<InfoData>`

#### Example

```javascript
const infoResult = await BladeSdk.getInfo();
console.log('getInfo:', infoResult);
```

## createAccount

Create new Hedera account (ECDSA). Only for configured dApps. Depending on dApp config Blade create account, associate tokens, etc.

In case of not using pre-created accounts pool and network high load, this method can return transactionId and no accountId.

In that case account creation added to queue, and you should wait some time and call `getPendingAccount()` method.

`createAccount(
    privateKey: string, 
    deviceId: string): Promise<CreateAccountData>`

#### Parameters

| Name | Type | Description |
|------|------| ----------- |
| `privateKey` | `string` | optional field if you need specify account key (hex encoded privateKey with DER-prefix) |
| `deviceId` | `string` | optional field for headers for backend check |

#### Returns

`Promise<CreateAccountData>`

#### Example

```javascript
const newAccountPrivateKey = '3030020100300706052b8104000a0422042047203b26c99c5f002d3b5c38b6bcd2ab46de8ad3fa90c5a39dcfdc5904dfa9a0';
const accountResult = await BladeSdk.createAccount(newAccountPrivateKey, '');
console.log('createAccount:', accountResult);
```

## associateToken

Associate token to account. Association fee will be covered by PayMaster, if tokenId configured in dApp

`associateToken(
    tokenId: string, 
    accountId: string, 
    accountPrivateKey: string): Promise<TransactionReceiptData>`

#### Parameters

| Name | Type | Description |
|------|------| ----------- |
| `tokenId` | `string` | token id to associate. Empty to associate all tokens configured in dApp |
| `accountId` | `string` | account id to associate token |
| `accountPrivateKey` | `string` | account private key |

#### Returns

`Promise<TransactionReceiptData>`

#### Example

```javascript
const associateResult = await BladeSdk.associateToken('0.0.1337', '0.0.10001', '3030020100300706052b8104000a0422042047203b26c99c5f002d3b5c38b6bcd2ab46de8ad3fa90c5a39dcfdc5904dfa9a0');
console.log('associateResult:', associateResult);
```

## deleteAccount

Delete Hedera account. This method requires account private key and operator private key. Operator is the one who paying fees

`deleteAccount(
    deleteAccountId: string, 
    deletePrivateKey: string, 
    transferAccountId: string, 
    operatorAccountId: string, 
    operatorPrivateKey: string): Promise<TransactionReceiptData>`

#### Parameters

| Name | Type | Description |
|------|------| ----------- |
| `deleteAccountId` | `string` | account id of account to delete (0.0.xxxxx) |
| `deletePrivateKey` | `string` | account private key (DER encoded hex string) |
| `transferAccountId` | `string` | if any funds left on account, they will be transferred to this account (0.0.xxxxx) |
| `operatorAccountId` | `string` | operator account id (0.0.xxxxx). Used for fee |
| `operatorPrivateKey` | `string` | operator's account private key (DER encoded hex string) |

#### Returns

`Promise<TransactionReceiptData>`

#### Example

```javascript
const accountResult = await BladeSdk.createAccount('', '');
console.log('createAccount:', accountResult);

const deleteResult = await BladeSdk.deleteAccount(
  accountResult.accountId,
  accountResult.privateKey,
  operatorAccountId,
  operatorAccountId,
  operatorPrivateKey
);
console.log('deleteAccount:', result);
```

## getBalance

Get hbar and token balances for specific account.

`getBalance(accountId: string): Promise<BalanceData>`

#### Parameters

| Name | Type | Description |
|------|------| ----------- |
| `accountId` | `string` | Hedera account id (0.0.xxxxx) |

#### Returns

`Promise<BalanceData>`

#### Example

```javascript
const balanceResult = await BladeSdk.getBalance('0.0.10001');
console.log('getBalance:', balanceResult);
```

## getTransactions

Get transactions history for account. Can be filtered by transaction type.

Transaction requested from mirror node. Every transaction requested for child transactions. Result are flattened.

If transaction type is not provided, all transactions will be returned.

If transaction type is CRYPTOTRANSFERTOKEN records will additionally contain plainData field with decoded data.

`getTransactions(
    accountId: string, 
    transactionType: string = '', 
    nextPage: string = '', 
    transactionsLimit: number = 10): Promise<TransactionsHistoryData>`

#### Parameters

| Name | Type | Description |
|------|------| ----------- |
| `accountId` | `string` | account id to get transactions for (0.0.xxxxx) |
| `transactionType` | `string` | one of enum MirrorNodeTransactionType or "CRYPTOTRANSFERTOKEN" |
| `nextPage` | `string` | link to next page of transactions from previous request |
| `transactionsLimit` | `number` | number of transactions to return. Speed of request depends on this value if transactionType is set. |

#### Returns

`Promise<TransactionsHistoryData>`

#### Example

```javascript
const transactionsResult = await BladeSdk.getTransactions('0.0.10001');
console.log('getTransactions:', transactionsResult);
```

## getCoinList

Get list of all available coins on CoinGecko.

`getCoinList(): Promise<CoinListData>`


#### Returns

`Promise<CoinListData>`

#### Example

```javascript
const coinListResult = await BladeSdk.getCoinList();
console.log('getCoinList:', coinListResult);
```

## getCoinPrice

Get coin price and coin info from CoinGecko. Search can be coin id or address in one of the coin platforms.

`getCoinPrice(
    search: string, 
    currency: string = 'usd'): Promise<CoinInfoData>`

#### Parameters

| Name | Type | Description |
|------|------| ----------- |
| `search` | `string` | coin alias (get one using getCoinList method) |
| `currency` | `string` | currency to get price in (usd, eur, etc.) |

#### Returns

`Promise<CoinInfoData>`

#### Example

```javascript
const coinPriceResult = await BladeSdk.getCoinPrice('hbar', 'uah');
console.log('getCoinPrice:', coinPriceResult);
```

## exchangeGetQuotes

Get quotes from different services for buy, sell or swap

`exchangeGetQuotes(
    sourceCode: string, 
    sourceAmount: number, 
    targetCode: string, 
    strategy: CryptoFlowServiceStrategy): Promise<SwapQuotesData>`

#### Parameters

| Name | Type | Description |
|------|------| ----------- |
| `sourceCode` | `string` | name (HBAR, KARATE, other token code) |
| `sourceAmount` | `number` | amount to swap, buy or sell |
| `targetCode` | `string` | name (HBAR, KARATE, USDC, other token code) |
| `strategy` | `CryptoFlowServiceStrategy` | one of enum CryptoFlowServiceStrategy (Buy, Sell, Swap) |

#### Returns

`Promise<SwapQuotesData>`

#### Example

```javascript
const quotesResult = await BladeSdk.exchangeGetQuotes('USD', 100, 'HBAR', CryptoFlowServiceStrategy.BUY);
console.log('exchangeGetQuotes:', quotesResult);
```

## getTradeUrl

Get configured url to buy or sell tokens or fiat

`getTradeUrl(
    strategy: CryptoFlowServiceStrategy, 
    accountId: string, 
    sourceCode: string, 
    sourceAmount: number, 
    targetCode: string, 
    slippage: number, 
    serviceId: string, 
    redirectUrl: string = ''): Promise<IntegrationUrlData>`

#### Parameters

| Name | Type | Description |
|------|------| ----------- |
| `strategy` | `CryptoFlowServiceStrategy` | Buy / Sell |
| `accountId` | `string` | account id |
| `sourceCode` | `string` | name (HBAR, KARATE, USDC, other token code) |
| `sourceAmount` | `number` | amount to buy/sell |
| `targetCode` | `string` | name (HBAR, KARATE, USDC, other token code) |
| `slippage` | `number` | slippage in percents. Transaction will revert if the price changes unfavorably by more than this percentage. |
| `serviceId` | `string` | service id to use (saucerswap, onmeta, etc) |
| `redirectUrl` | `string` | optional url to redirect after final step |

#### Returns

`Promise<IntegrationUrlData>`

#### Example

```javascript
const urlResult = await BladeSdk.getTradeUrl(CryptoFlowServiceStrategy.BUY, operatorAccountId, 'USD', 100, 'HBAR', 2, 'moonpay', '');
console.log('getTradeUrl:', urlResult);
```

## sign

Sign base64-encoded message with private key. Returns hex-encoded signature.

`sign(
    messageString: string, 
    privateKey: string): Promise<SignMessageData>`

#### Parameters

| Name | Type | Description |
|------|------| ----------- |
| `messageString` | `string` | base64-encoded message to sign |
| `privateKey` | `string` | hex-encoded private key with DER header |

#### Returns

`Promise<SignMessageData>`

#### Example

```javascript
const signResult = await BladeSdk.sign(
  Buffer.from('Hello, World!').toString('base64'),
  newAccountPrivateKey
);
console.log('sign:', signResult);
```

