package com.infraredinterface

import android.content.Context.CONSUMER_IR_SERVICE
import android.hardware.ConsumerIrManager
import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.WritableMap

class InfraredInterfaceModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  private var manager: ConsumerIrManager? = reactContext.getSystemService(CONSUMER_IR_SERVICE) as? ConsumerIrManager

  override fun getName(): String {
    return NAME
  }


  @ReactMethod
  fun hasIrEmitter(promise: Promise) {
    promise.resolve(manager?.hasIrEmitter())
  }

  @ReactMethod
  fun getCarrierFrequencies(promise: Promise) {
    try {
      val carrierFrequencyRanges = manager!!.carrierFrequencies
      val carrierFrequencies: WritableArray = Arguments.createArray()

      for (carrierFrequencyRange in carrierFrequencyRanges) {
        val carrierFrequency: WritableMap = Arguments.createMap()
        carrierFrequency.putInt("minFrequency", carrierFrequencyRange.minFrequency)
        carrierFrequency.putInt("maxFrequency", carrierFrequencyRange.maxFrequency)
        carrierFrequencies.pushMap(carrierFrequency)
      }

      promise.resolve(carrierFrequencies)
    } catch (e: Exception) {
      promise.reject(e)
    }
  }

  @ReactMethod
  fun transmit(carrierFrequency: Int, pattern: String, promise: Promise) {
    try {
      val convertedPattern = pattern.split(" ")          // Split the string by space
      .map { it.toInt() }  // Convert each substring to an integer
        .toIntArray()        // Convert the list of integers to an IntArray

      manager!!.transmit(carrierFrequency, convertedPattern)

      promise.resolve("Transmission completed")
    } catch (e: Exception) {
      Log.e("Infrared interface", e.toString())
      promise.reject(e)
    }
  }

  companion object {
    const val NAME = "InfraredInterface"
  }
}
