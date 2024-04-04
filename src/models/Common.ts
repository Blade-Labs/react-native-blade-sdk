import type { MirrorNodeTransactionType } from './TransactionType';

export enum BladeEnv {
  Prod = 'Prod',
  CI = 'CI',
}

export enum CryptoFlowServiceStrategy {
  BUY = 'BUY',
  SELL = 'SELL',
  SWAP = 'SWAP',
}

export interface InfoData {
  apiKey: string;
  dAppCode: string;
  network: string;
  visitorId: string;
  sdkEnvironment: string;
  sdkVersion: string;
  nonce: number;
}

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

export interface BalanceData {
  hbars: number;
  tokens: {
    tokenId: string;
    balance: number;
  }[];
}

export interface TransactionsHistoryData {
  transactions: TransactionData[];
  nextPage?: string;
}

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

export interface TransferData {
  amount: number;
  account: string;
  token_id?: string;
}

export interface SignMessageData {
  signedMessage: string;
}

export interface TransactionReceiptData {
  status: string;
  contractId?: string;
  topicSequenceNumber?: string;
  totalSupply?: string;
  serials: string[];
}

export interface CoinListData {
  coins: CoinItem[];
}

export interface CoinItem {
  id: string;
  symbol: string;
  name: string;
  platforms: CoinGeckoPlatform[];
}

export interface CoinGeckoPlatform {
  name: string;
  address: string;
}

export interface CoinInfoData {
  coin: CoinData;
  priceUsd: number;
  price?: number;
  currency: string;
}

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

export interface CoinDataDescription {
  en: string;
}

export interface CoinDataImage {
  thumb: string;
  small: string;
  large: string;
}

export interface CoinDataMarket {
  current_price: { [key: string]: number };
}

export interface IntegrationUrlData {
  url?: string;
}

export interface SwapQuotesData {
  quotes: ICryptoFlowQuote[];
}

export interface ICryptoFlowQuote {
  service: ICryptoFlowQuoteService;
  source: IAssetQuote;
  target: IAssetQuote;
  rate: number;
  widgetUrl?: string;
  paymentMethods?: string[];
}

export interface ICryptoFlowQuoteService {
  id: string;
  name: string;
  logo: string;
  description?: string;
}

export interface IAssetQuote {
  asset: ICryptoFlowAsset;
  amountExpected: number;
  totalFee?: number;
}

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
