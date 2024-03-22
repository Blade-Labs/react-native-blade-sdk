import SwiftBlade

@objc(BladeSdk)
class BladeSdk: NSObject {

@objc(initialize:dAppCode:network:bladeEnv:force:resolver:rejecter:)
  func initialize(_ apiKey: String, dAppCode: String, network: String, bladeEnv: String, force: Bool,
                 resolver: @escaping RCTPromiseResolveBlock,
                 rejecter: @escaping RCTPromiseRejectBlock
  ) {
    SwiftBlade.shared.initialize(
      apiKey: apiKey,
      dAppCode: dAppCode,
      network: HederaNetwork.init(rawValue: network) ?? HederaNetwork.TESTNET,
      bladeEnv: BladeEnv.init(rawValue: bladeEnv) ?? BladeEnv.CI,
      force: force
    ) { (result, error) in
      if (result != nil) {
        do {
          let json = try JSONEncoder().encode(result)
          resolver(String(data: json, encoding: .utf8) ?? "{}")
        } catch {
          rejecter("JSON encode problem", error.localizedDescription, error)
        }
      } else {
        rejecter(error?.name, error?.reason, error)
      }
    }
  }
  
  @objc(createAccount:deviceId:resolver:rejecter:)
  func createAccount(_ privateKey: String, deviceId: String,
                 resolver: @escaping RCTPromiseResolveBlock,
                 rejecter: @escaping RCTPromiseRejectBlock
  ) {
    SwiftBlade.shared.createHederaAccount(
      privateKey: privateKey,
      deviceId: deviceId
    ) { (result, error) in
      if (result != nil) {
        do {
          let json = try JSONEncoder().encode(result)
          resolver(String(data: json, encoding: .utf8) ?? "{}")
        } catch {
          rejecter("JSON encode problem", error.localizedDescription, error)
        }
      } else {
        rejecter(error?.name, error?.reason, error)
      }
    }
  }
  
  @objc(sign:privateKey:resolver:rejecter:)
  func sign(_ messageString: String, privateKey: String,
                 resolver: @escaping RCTPromiseResolveBlock,
                 rejecter: @escaping RCTPromiseRejectBlock
  ) {
    SwiftBlade.shared.sign(
      messageString: messageString,
      privateKey: privateKey
    ) { (result, error) in
      if (result != nil) {
        do {
          let json = try JSONEncoder().encode(result)
          resolver(String(data: json, encoding: .utf8) ?? "{}")
        } catch {
          rejecter("JSON encode problem", error.localizedDescription, error)
        }
      } else {
        rejecter(error?.name, error?.reason, error)
      }
    }
  }


}
