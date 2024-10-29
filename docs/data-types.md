# ENUMs


### BladeEnv

```typescript
export enum BladeEnv {
  Prod = 'Prod',
  CI = 'CI',
}
```


### CryptoFlowServiceStrategy

```typescript
export enum CryptoFlowServiceStrategy {
  BUY = 'Buy',
  SELL = 'Sell',
  SWAP = 'Swap',
}
```


### MirrorNodeTransactionType

```typescript
export enum MirrorNodeTransactionType {
  CONSENSUSCREATETOPIC = 'CONSENSUSCREATETOPIC',
  CONSENSUSDELETETOPIC = 'CONSENSUSDELETETOPIC',
  CONSENSUSSUBMITMESSAGE = 'CONSENSUSSUBMITMESSAGE',
  CONSENSUSUPDATETOPIC = 'CONSENSUSUPDATETOPIC',
  CONTRACTCALL = 'CONTRACTCALL',
  CONTRACTCREATEINSTANCE = 'CONTRACTCREATEINSTANCE',
  CONTRACTDELETEINSTANCE = 'CONTRACTDELETEINSTANCE',
  CONTRACTUPDATEINSTANCE = 'CONTRACTUPDATEINSTANCE',
  CRYPTOADDLIVEHASH = 'CRYPTOADDLIVEHASH',
  CRYPTOCREATEACCOUNT = 'CRYPTOCREATEACCOUNT',
  CRYPTODELETE = 'CRYPTODELETE',
  CRYPTODELETELIVEHASH = 'CRYPTODELETELIVEHASH',
  CRYPTOTRANSFER = 'CRYPTOTRANSFER',
  CRYPTOUPDATEACCOUNT = 'CRYPTOUPDATEACCOUNT',
  FILEAPPEND = 'FILEAPPEND',
  FILECREATE = 'FILECREATE',
  FILEDELETE = 'FILEDELETE',
  FILEUPDATE = 'FILEUPDATE',
  FREEZE = 'FREEZE',
  SCHEDULECREATE = 'SCHEDULECREATE',
  SCHEDULEDELETE = 'SCHEDULEDELETE',
  SCHEDULESIGN = 'SCHEDULESIGN',
  SYSTEMDELETE = 'SYSTEMDELETE',
  SYSTEMUNDELETE = 'SYSTEMUNDELETE',
  TOKENASSOCIATE = 'TOKENASSOCIATE',
  TOKENBURN = 'TOKENBURN',
  TOKENCREATION = 'TOKENCREATION',
  TOKENDELETION = 'TOKENDELETION',
  TOKENDISSOCIATE = 'TOKENDISSOCIATE',
  TOKENFEESCHEDULEUPDATE = 'TOKENFEESCHEDULEUPDATE',
  TOKENFREEZE = 'TOKENFREEZE',
  TOKENGRANTKYC = 'TOKENGRANTKYC',
  TOKENMINT = 'TOKENMINT',
  TOKENPAUSE = 'TOKENPAUSE',
  TOKENREVOKEKYC = 'TOKENREVOKEKYC',
  TOKENUNFREEZE = 'TOKENUNFREEZE',
  TOKENUNPAUSE = 'TOKENUNPAUSE',
  TOKENUPDATE = 'TOKENUPDATE',
  TOKENWIPE = 'TOKENWIPE',
  UNCHECKEDSUBMIT = 'UNCHECKEDSUBMIT',
}
```


### Network

```typescript
export enum Network {
  Mainnet = 'MAINNET',
  Testnet = 'TESTNET',
}
```



# Data types


### BalanceData

```typescript
export interface BalanceData {
  hbars: number;
  tokens: {
    tokenId: string;
    balance: number;
  }[];
}
```


### CoinData

```typescript
export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  web_slug: string;
  description: CoinDataDescription;
  image: CoinDataImage;
  market_data: CoinDataMarket;
  platforms: CoinGeckoPlatform[];
}
```


### CoinDataDescription

```typescript
export interface CoinDataDescription {
  en: string;
}
```


### CoinDataImage

```typescript
export interface CoinDataImage {
  thumb: string;
  small: string;
  large: string;
}
```


### CoinDataMarket

```typescript
export interface CoinDataMarket {
  current_price: { [key: string]: number };
}
```


### CoinGeckoPlatform

```typescript
export interface CoinGeckoPlatform {
  name: string;
  address: string;
}
```


### CoinInfoData

```typescript
export interface CoinInfoData {
  coin: CoinData;
  priceUsd: number;
  price?: number;
  currency: string;
}
```


### CoinItem

```typescript
export interface CoinItem {
  id: string;
  symbol: string;
  name: string;
  platforms: CoinGeckoPlatform[];
}
```


### CoinListData

```typescript
export interface CoinListData {
  coins: CoinItem[];
}
```


### CreateAccountData

```typescript
export interface CreateAccountData {
  seedPhrase: string;
  publicKey: string;
  privateKey: string;
  accountId?: string;
  evmAddress: string;
  transactionId?: string;
  status: string;
  queueNumber: number;
}
```


### IAssetQuote

```typescript
export interface IAssetQuote {
  asset: ICryptoFlowAsset;
  amountExpected: number;
  totalFee?: number;
}
```


### ICryptoFlowAsset

```typescript
export interface ICryptoFlowAsset {
  name: string;
  code: string;
  type: string;
  address?: string;
  chainId?: number;
  decimals?: number;
  minAmount?: number;
  maxAmount?: number;
  symbol?: string;
  imageUrl?: string;
}
```


### ICryptoFlowQuote

```typescript
export interface ICryptoFlowQuote {
  service: ICryptoFlowQuoteService;
  source: IAssetQuote;
  target: IAssetQuote;
  rate: number;
  widgetUrl?: string;
  paymentMethods?: string[];
}
```


### ICryptoFlowQuoteService

```typescript
export interface ICryptoFlowQuoteService {
  id: string;
  name: string;
  logo: string;
  description?: string;
}
```


### InfoData

```typescript
export interface InfoData {
  apiKey: string;
  dAppCode: string;
  network: string;
  visitorId: string;
  sdkEnvironment: string;
  sdkVersion: string;
  nonce: number;
}
```


### IntegrationUrlData

```typescript
export interface IntegrationUrlData {
  url?: string;
}
```


### SignMessageData

```typescript
export interface SignMessageData {
  signedMessage: string;
}
```


### SwapQuotesData

```typescript
export interface SwapQuotesData {
  quotes: ICryptoFlowQuote[];
}
```


### SwapResultData

```typescript
export interface SwapResultData {
  success: boolean;
  sourceAddress: string;
  targetAddress: string;
  balance: BalanceData;
}
```


### TransactionData

```typescript
export interface TransactionData {
  transactionId: string;
  type: MirrorNodeTransactionType;
  time: Date;
  transfers: TransferData[];
  nftTransfers?: [];
  memo?: string;
  fee?: number;
  showDetailed?: boolean;
  plainData?: any;
  consensusTimestamp: string;
}
```


### TransactionReceiptData

```typescript
export interface TransactionReceiptData {
  status: string;
  contractId?: string;
  topicSequenceNumber?: string;
  totalSupply?: string;
  serials: string[];
}
```


### TransactionsHistoryData

```typescript
export interface TransactionsHistoryData {
  transactions: TransactionData[];
  nextPage?: string;
}
```


### TransferData

```typescript
export interface TransferData {
  amount: number;
  account: string;
  token_id?: string;
}
```



