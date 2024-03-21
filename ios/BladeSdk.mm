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

RCT_EXTERN_METHOD(createAccount:(NSString *)privateKey
                  deviceId: (NSString *)deviceId
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
