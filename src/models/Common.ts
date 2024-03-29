import type { MirrorNodeTransactionType } from './TransactionType';

export enum BladeEnv {
  Prod = 'Prod',
  CI = 'CI',
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
