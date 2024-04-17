# react-native-blade-sdk

Blade SDK for React Native (limited functionality)

## Installation

```sh
npm install @bladelabs/react-native-blade-sdk
```

## Usage

```js
import BladeSdk, { BladeEnv, Network, CryptoFlowServiceStrategy } from '@bladelabs/react-native-blade-sdk';
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

const associateResult = await BladeSdk.associateToken(
    '0.0.2661784',
    '0.0.4232099',
    '3030020100300706052b8104000a0422042047203b26c99c5f002d3b5c38b6bcd2ab46de8ad3fa90c5a39dcfdc5904dfa9a0'
);
    console.log('associateResult:', associateResult);

const balanceResult = await BladeSdk.getBalance(operatorAccountId);
console.log('getBalance:', balanceResult);

const transactionsResult = await BladeSdk.getTransactions(operatorAccountId);
console.log('getTransactions:', transactionsResult);

const coinListResult = await BladeSdk.getCoinList();
console.log('getCoinList:', coinListResult);

const coinPriceResult = await BladeSdk.getCoinPrice('hbar', 'uah');
console.log('getCoinPrice:', coinPriceResult);

const quotesResult = await BladeSdk.exchangeGetQuotes(
    'USD',
    100,
    'HBAR',
    CryptoFlowServiceStrategy.BUY
);
console.log('exchangeGetQuotes:', quotesResult);

const urlResult = await BladeSdk.getTradeUrl(
    CryptoFlowServiceStrategy.BUY,
    operatorAccountId,
    'USD',
    100,
    'HBAR',
    2,
    'moonpay'
);
console.log('getTradeUrl:', urlResult);

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
