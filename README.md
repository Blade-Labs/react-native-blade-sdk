# react-native-blade-sdk

Blade SDK for React Native (limited functionality)

## Installation

```sh
npm install @bladelabs/react-native-blade-sdk
```

## Usage

```js
import BladeSdk, { BladeEnv, Network } from '@bladelabs/react-native-blade-sdk';
import type { CreateAccountData } from '@bladelabs/react-native-blade-sdk';

// ...

const operatorAccountId = '0.0.....';
const operatorPrivateKey = '303002..............................................................................................';
let createdAccount: CreateAccountData | null = null;

const initResult = await BladeSdk.initialize(apiKey, dAppCode, Network.Testnet, BladeEnv.CI, true);

const infoResult = await BladeSdk.getInfo();
console.log('getInfo:', infoResult);

const newAccountPrivateKey = '3030020100300706052b8104000a0422042047203b26c99c5f002d3b5c38b6bcd2ab46de8ad3fa90c5a39dcfdc5904dfa9a0';
const accountResult = await BladeSdk.createAccount(
    newAccountPrivateKey,
    ''
);
console.log('createAccount:', accountResult);

const deleteResult = await BladeSdk.deleteAccount(
    accountResult.accountId,
    accountResult.privateKey,
    operatorAccountId,
    operatorAccountId,
    operatorPrivateKey
);
console.log('deleteAccount:', result);

const balanceResult = await BladeSdk.getBalance(operatorAccountId);
console.log('getBalance:', balanceResult);

const transactionsResult = await BladeSdk.getTransactions(operatorAccountId);
console.log('getTransactions:', transactionsResult);

const signResult = await BladeSdk.sign(
    Buffer.from('Hello, World!').toString('base64'),
    newAccountPrivateKey
);
console.log('sign:', signResult);
```

## Documentation 

Visit our [BladeSDK documentation portal](https://docs.bladelabs.io/)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
