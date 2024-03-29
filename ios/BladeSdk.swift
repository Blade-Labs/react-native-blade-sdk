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
  
  @objc(getInfo:rejecter:)
  func getInfo(_ resolver: @escaping RCTPromiseResolveBlock,
                 rejecter: @escaping RCTPromiseRejectBlock
  ) {
    SwiftBlade.shared.getInfo() { (result, error) in
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

  @objc(deleteAccount:deletePrivateKey:transferAccountId:operatorAccountId:operatorPrivateKey:resolver:rejecter:)
  func deleteAccount(_ deleteAccountId: String, deletePrivateKey: String, transferAccountId: String, operatorAccountId: String, operatorPrivateKey: String,
                 resolver: @escaping RCTPromiseResolveBlock,
                 rejecter: @escaping RCTPromiseRejectBlock
  ) {
    SwiftBlade.shared.deleteHederaAccount(
      deleteAccountId: deleteAccountId,
      deletePrivateKey: deletePrivateKey,
      transferAccountId: transferAccountId,
      operatorAccountId: operatorAccountId,
      operatorPrivateKey: operatorPrivateKey
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


  @objc(getBalance:resolver:rejecter:)
  func getBalance(_ accountId: String,
                 resolver: @escaping RCTPromiseResolveBlock,
                 rejecter: @escaping RCTPromiseRejectBlock
  ) {
    SwiftBlade.shared.getBalance(
        accountId
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

  @objc(getTransactions:transactionType:nextPage:transactionsLimit:resolver:rejecter:)
  func getTransactions(_ accountId: String, transactionType: String, nextPage: String, transactionsLimit: Int,
                 resolver: @escaping RCTPromiseResolveBlock,
                 rejecter: @escaping RCTPromiseRejectBlock
  ) {
    SwiftBlade.shared.getTransactions(
      accountId: accountId,
      transactionType: transactionType,
      nextPage: nextPage,
      transactionsLimit: transactionsLimit
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
