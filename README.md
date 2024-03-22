# react-native-blade-sdk

Blade SDK for React Native

## Installation

```sh
npm install react-native-blade-sdk
```

## Usage

```js
import BladeSdk, { BladeEnv, Network } from 'react-native-blade-sdk';

// ...

const initResult = await BladeSdk.initialize(apiKey, dAppCode, Network.Testnet, BladeEnv.CI, true);
const accountResult = await BladeSdk.createAccount(
    newAccountPrivateKey,
    ''
);
console.log('ACCOUNT:', accountResult);
```

## Documentation 

Visit our [BladeSDK documentation portal](https://docs.bladelabs.io/)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
