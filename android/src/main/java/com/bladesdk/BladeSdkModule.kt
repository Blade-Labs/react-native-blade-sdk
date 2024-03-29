package com.bladesdk

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.google.gson.Gson
import io.bladewallet.bladesdk.Blade
import io.bladewallet.bladesdk.BladeEnv
import kotlinx.coroutines.launch
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers

class BladeSdkModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  private val gson = Gson()
  override fun getName(): String {
    return NAME
  }

  @ReactMethod fun initialize(apiKey: String, dAppCode: String, network: String, bladeEnv: String, force: Boolean, promise: Promise) {
    try {
      Blade.initialize(
        apiKey,
        dAppCode,
        network,
        BladeEnv.valueOf(bladeEnv),
        this.reactApplicationContext,
        force
      ) { data, bladeJSError ->
        if (data != null) {
          promise.resolve(gson.toJson(data))
        } else {
          promise.reject(bladeJSError)
        }
      }
    } catch (e: Exception) {
      promise.reject(e)
    }
  }

  @ReactMethod fun getInfo(promise: Promise) {
    CoroutineScope(Dispatchers.Main).launch {
      try {
        Blade.getInfo() { data, bladeJSError ->
          if (data != null) {
            promise.resolve(gson.toJson(data))
          } else {
            promise.reject(bladeJSError)
          }
        }
      } catch (e: Exception) {
        promise.reject(e)
      }
    }
  }

  @ReactMethod fun createAccount(privateKey: String, deviceId: String, promise: Promise) {
    CoroutineScope(Dispatchers.Main).launch {
      try {
        Blade.createHederaAccount(
          privateKey,
          deviceId,
        ) { data, bladeJSError ->
          if (data != null) {
            promise.resolve(gson.toJson(data))
          } else {
            promise.reject(bladeJSError)
          }
        }
      } catch (e: Exception) {
        promise.reject(e)
      }
    }
  }

  @ReactMethod fun deleteAccount(deleteAccountId: String, deletePrivateKey: String, transferAccountId: String, operatorAccountId: String, operatorPrivateKey: String, promise: Promise) {
    CoroutineScope(Dispatchers.Main).launch {
      try {
        Blade.deleteHederaAccount(
          deleteAccountId,
          deletePrivateKey,
          transferAccountId,
          operatorAccountId,
          operatorPrivateKey,
        ) { data, bladeJSError ->
          if (data != null) {
            promise.resolve(gson.toJson(data))
          } else {
            promise.reject(bladeJSError)
          }
        }
      } catch (e: Exception) {
        promise.reject(e)
      }
    }
  }

  @ReactMethod fun getBalance(accountId: String, promise: Promise) {
    CoroutineScope(Dispatchers.Main).launch {
      try {
        Blade.getBalance(
          accountId
        ) { data, bladeJSError ->
          if (data != null) {
            promise.resolve(gson.toJson(data))
          } else {
            promise.reject(bladeJSError)
          }
        }
      } catch (e: Exception) {
        promise.reject(e)
      }
    }
  }


  @ReactMethod fun getTransactions(accountId: String, transactionType: String, nextPage: String, transactionsLimit: Double, promise: Promise) {
    CoroutineScope(Dispatchers.Main).launch {
      try {
        Blade.getTransactions(
          accountId, transactionType, nextPage, transactionsLimit.toInt()
        ) { data, bladeJSError ->
          if (data != null) {
            promise.resolve(gson.toJson(data))
          } else {
            promise.reject(bladeJSError)
          }
        }
      } catch (e: Exception) {
        promise.reject(e)
      }
    }
  }

  @ReactMethod fun sign(messageString: String, privateKey: String, promise: Promise) {
    CoroutineScope(Dispatchers.Main).launch {
      try {
        Blade.sign(
          messageString,
          privateKey,
        ) { data, bladeJSError ->
          if (data != null) {
            promise.resolve(gson.toJson(data))
          } else {
            promise.reject(bladeJSError)
          }
        }
      } catch (e: Exception) {
        promise.reject(e)
      }
    }
  }

  companion object {
    const val NAME = "BladeSdk"
  }
}
