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
      ) { infoData, bladeJSError ->
        if (infoData != null) {
          promise.resolve(gson.toJson(infoData))
        } else {
          promise.reject(bladeJSError)
        }
      }
    } catch (e: Exception) {
      promise.reject(e)
    }
  }

  @ReactMethod fun createAccount(privateKey: String, deviceId: String, promise: Promise) {
    CoroutineScope(Dispatchers.Main).launch {
      try {
        Blade.createHederaAccount(
          privateKey,
          deviceId,
        ) { accountData, bladeJSError ->
          if (accountData != null) {
            promise.resolve(gson.toJson(accountData))
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
        ) { signMessageData, bladeJSError ->
          if (signMessageData != null) {
            promise.resolve(gson.toJson(signMessageData))
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
