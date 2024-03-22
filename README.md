# react-native-blade-sdk

Blade SDK for React Native (limited functionality)

## Installation

```sh
npm install @bladelabs/react-native-blade-sdk
```

## Usage

```js
import BladeSdk, { BladeEnv, Network } from '@bladelabs/react-native-blade-sdk';

// ...

const initResult = await BladeSdk.initialize(apiKey, dAppCode, Network.Testnet, BladeEnv.CI, true);

const newAccountPrivateKey = '3030020100300706052b8104000a0422042047203b26c99c5f002d3b5c38b6bcd2ab46de8ad3fa90c5a39dcfdc5904dfa9a0';
const accountResult = await BladeSdk.createAccount(
    newAccountPrivateKey,
    ''
);
console.log('ACCOUNT:', accountResult);

const signResult = await BladeSdk.sign(
    Buffer.from('Hello, World!').toString('base64'),
    newAccountPrivateKey
);
console.log('SIGN:', signResult);
```

## Documentation 

Visit our [BladeSDK documentation portal](https://docs.bladelabs.io/)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
