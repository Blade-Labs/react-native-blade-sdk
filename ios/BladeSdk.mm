//
//  BladeSdk.mm
//
//  Created by Ihor Dubii on 14/03/2024.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(BladeSdk, NSObject)

RCT_EXTERN_METHOD(initialize:(NSString *)apiKey
                  dAppCode: (NSString *)dAppCode
                  network: (NSString *)network
                  bladeEnv: (NSString *)bladeEnv
                  force: (BOOL)force
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getInfo:(RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(createAccount:(NSString *)privateKey
                  deviceId: (NSString *)deviceId
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(associateToken:(NSString *)tokenIdOrCampaign
                  accountId: (NSString *)accountId
                  accountPrivateKey: (NSString *)accountPrivateKey
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(deleteAccount:(NSString *)deleteAccountId
                  deletePrivateKey: (NSString *)deletePrivateKey
                  transferAccountId: (NSString *)transferAccountId
                  operatorAccountId: (NSString *)operatorAccountId
                  operatorPrivateKey: (NSString *)operatorPrivateKey
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getBalance:(NSString *)accountId
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(transferHbars:(NSString *)accountId
                  accountPrivateKey: (NSString *)accountPrivateKey
                  receiverId: (NSString *)receiverId
                  amount: (double *)amount
                  memo: (NSString *)memo
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(transferTokens:(NSString *)tokenId
                  accountId: (NSString *)accountId
                  accountPrivateKey: (NSString *)accountPrivateKey
                  receiverId: (NSString *)receiverId
                  amountOrSerial: (double *)amountOrSerial
                  memo: (NSString *)memo
                  usePaymaster: (BOOL)usePaymaster
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getTransactions:(NSString *)accountId
                  transactionType: (NSString *)transactionType
                  nextPage: (NSString *)nextPage
                  transactionsLimit: (NSInteger *)transactionsLimit
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getCoinList:(RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getCoinPrice:(NSString *)search
                  currency: (NSString *)currency
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(exchangeGetQuotes:(NSString *)sourceCode
                  sourceAmount: (double *)sourceAmount
                  targetCode: (NSString *)targetCode
                  strategy: (NSString *)strategy
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getTradeUrl:(NSString *)strategy
                  accountId: (NSString *)accountId
                  sourceCode: (NSString *)sourceCode
                  sourceAmount: (double *)sourceAmount
                  targetCode: (NSString *)targetCode
                  slippage: (double *)slippage
                  serviceId: (NSString *)serviceId
                  redirectUrl: (NSString *)redirectUrl
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getExchangeStatus:(NSString *)serviceId
                  orderId: (NSString *)orderId
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(swapTokens:(NSString *)accountId
                  accountPrivateKey: (NSString *)accountPrivateKey
                  sourceCode: (NSString *)sourceCode
                  sourceAmount: (double *)sourceAmount
                  targetCode: (NSString *)targetCode
                  slippage: (double *)slippage
                  serviceId: (NSString *)serviceId
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(sign:(NSString *)messageString
                  privateKey: (NSString *)privateKey
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup {
  return NO;
}

@end
