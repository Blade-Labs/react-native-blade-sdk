# React-native-blade-sdk

Blade SDK for React Native (limited functionality). 

This SDK is a bridge between React Native and [Swift Blade SDK](https://github.com/Blade-Labs/swift-blade) or [Kotlin Blade SDK](https://github.com/Blade-Labs/kotlin-blade). For now, it supports only basic functionality. In near future it will repeat all functionality of native SDKs.

## Getting Started

### Requirements

- Node.js 16.x or higher (MacOS/Linux)
- Node.js 16.x to 18.x (Windows)

### Install

```
npm i @bladelabs/react-native-blade-sdk
```

## Usage

```
import BladeSdk, { BladeEnv, Network } from '@bladelabs/react-native-blade-sdk';

// ...

const apiKey = 'reactsdktest';
const dAppCode = 'FG9dUBQcBaBAPgCHz7DqmNZzrJyhewAMJytjwp3VFIEMFTXQyVSIDq6wRvtPcSAt';

const initResult = await BladeSdk.initialize(apiKey, dAppCode, Network.Testnet, BladeEnv.Prod, true);

const balanceResult = await BladeSdk.getBalance("0.0.10001");
console.log('getBalance:', balanceResult);
```

## Documentation

[React-native-blade-sdk documentation](SUMMARY.md).

For more information, please check our [Blade SDK Portal](https://docs.bladelabs.io/)  
