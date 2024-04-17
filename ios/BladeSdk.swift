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
      privateKey,
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

  @objc(associateToken:accountId:accountPrivateKey:resolver:rejecter:)
  func associateToken(_ tokenId: String, accountId: String, accountPrivateKey: String,
                 resolver: @escaping RCTPromiseResolveBlock,
                 rejecter: @escaping RCTPromiseRejectBlock
  ) {
    SwiftBlade.shared.associateToken(
      tokenId: tokenId,
      accountId: accountId,
      accountPrivateKey: accountPrivateKey
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

  @objc(getCoinList:rejecter:)
  func getCoinList(_ resolver: @escaping RCTPromiseResolveBlock,
                 rejecter: @escaping RCTPromiseRejectBlock
  ) {
    SwiftBlade.shared.getCoinList() { (result, error) in
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

  @objc(getCoinPrice:currency:resolver:rejecter:)
  func getCoinPrice(_ search: String, currency: String,
                 resolver: @escaping RCTPromiseResolveBlock,
                 rejecter: @escaping RCTPromiseRejectBlock
  ) {
    SwiftBlade.shared.getCoinPrice(
      search,
      currency
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

  @objc(exchangeGetQuotes:sourceAmount:targetCode:strategy:resolver:rejecter:)
  func exchangeGetQuotes(_ sourceCode: String, sourceAmount: Double, targetCode: String, strategy: String,
                 resolver: @escaping RCTPromiseResolveBlock,
                 rejecter: @escaping RCTPromiseRejectBlock
  ) {
    SwiftBlade.shared.exchangeGetQuotes(
      sourceCode: sourceCode,
      sourceAmount: sourceAmount,
      targetCode: targetCode,
      strategy: CryptoFlowServiceStrategy.init(rawValue: strategy) ?? CryptoFlowServiceStrategy.BUY
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

  @objc(getTradeUrl:accountId:sourceCode:sourceAmount:targetCode:slippage:serviceId:resolver:rejecter:)
  func getTradeUrl(_ strategy: String, accountId: String, sourceCode: String, sourceAmount: Double, targetCode: String, slippage: Double, serviceId: String,
                 resolver: @escaping RCTPromiseResolveBlock,
                 rejecter: @escaping RCTPromiseRejectBlock
  ) {
    SwiftBlade.shared.getTradeUrl(
      strategy: CryptoFlowServiceStrategy.init(rawValue: strategy) ?? CryptoFlowServiceStrategy.BUY,
      accountId: accountId,
      sourceCode: sourceCode,
      sourceAmount: sourceAmount,
      targetCode: targetCode,
      slippage: slippage,
      serviceId: serviceId
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
