import * as React from 'react';

import { StyleSheet, View, Button } from 'react-native';
import BladeSdk, {
  BladeEnv,
  CryptoFlowServiceStrategy,
  Network,
} from '@bladelabs/react-native-blade-sdk';
import type { CreateAccountData } from '@bladelabs/react-native-blade-sdk';
import { Buffer } from 'buffer';

const operatorAccountId = '0.0.1443';
const operatorPrivateKey =
  '3030020100300706052b8104000a04220420ebccecef769bb5597d0009123a0fd96d2cdbe041c2a2da937aaf8bdc8731799b';

export default function App() {
  let createdAccount: CreateAccountData | null = null;

  async function initHandler() {
    try {
      const res = await BladeSdk.initialize(
        'ygUgCzRrsvhWmb3dsLcDpGnJpSZ4tk8hACmZqg9WngpuQYKdnD5m8FjfPV3XVUeB',
        'unitysdktest',
        Network.Testnet,
        BladeEnv.CI,
        true
      );
      console.log('initialize:', res, res.apiKey);
    } catch (e) {
      console.error('BladeSdk problem', e);
    }
  }

  async function infoHandler() {
    try {
      const result = await BladeSdk.getInfo();
      console.log('getInfo:', result);
    } catch (e) {
      console.error('BladeSdk problem', e);
    }
  }

  async function accountHandler() {
    try {
      const result = await BladeSdk.createAccount(
        '3030020100300706052b8104000a0422042047203b26c99c5f002d3b5c38b6bcd2ab46de8ad3fa90c5a39dcfdc5904dfa9a0',
        ''
      );
      createdAccount = result;
      console.log('createAccount:', result);
    } catch (e) {
      console.error('BladeSdk problem', e);
    }
  }

  async function associateHandler() {
    try {
      const result = await BladeSdk.associateToken(
        '0.0.2661784',
        '0.0.4232099',
        '3030020100300706052b8104000a0422042047203b26c99c5f002d3b5c38b6bcd2ab46de8ad3fa90c5a39dcfdc5904dfa9a0'
      );
      console.log('associateToken:', result);
    } catch (e) {
      console.error('BladeSdk problem', e);
    }
  }

  async function deleteAccountHandler() {
    try {
      if (createdAccount) {
        const result = await BladeSdk.deleteAccount(
          createdAccount.accountId!,
          createdAccount.privateKey,
          operatorAccountId,
          operatorAccountId,
          operatorPrivateKey
        );
        createdAccount = null;
        console.log('deleteAccount:', result);
      } else {
        console.log('Create account first!');
      }
    } catch (e) {
      console.error('BladeSdk problem', e);
    }
  }

  async function signHandler() {
    try {
      const result = await BladeSdk.sign(
        Buffer.from('Hello, World!').toString('base64'),
        '3030020100300706052b8104000a0422042047203b26c99c5f002d3b5c38b6bcd2ab46de8ad3fa90c5a39dcfdc5904dfa9a0'
      );
      console.log('sign:', result);
    } catch (e) {
      console.error('BladeSdk problem', e);
    }
  }

  async function balanceHandler() {
    try {
      const result = await BladeSdk.getBalance('0.0.1430');
      console.log('getBalance:', result);
    } catch (e) {
      console.error('BladeSdk problem', e);
    }
  }

  async function transactionsHandler() {
    try {
      const result = await BladeSdk.getTransactions('0.0.1430');
      console.log('getTransactions:', result);
    } catch (e) {
      console.error('BladeSdk problem', e);
    }
  }

  async function getCoinListHandler() {
    try {
      const result = await BladeSdk.getCoinList();
      console.log('getCoinList:', result);
    } catch (e) {
      console.error('BladeSdk problem', e);
    }
  }

  async function getCoinPriceHandler() {
    try {
      const result = await BladeSdk.getCoinPrice('hbar', 'uah');
      console.log('getCoinPrice:', result);
    } catch (e) {
      console.error('BladeSdk problem', e);
    }
  }

  async function exchangeGetQuotesHandler() {
    try {
      // const result = await BladeSdk.exchangeGetQuotes(
      //   'USD',
      //   200,
      //   'HBAR',
      //   CryptoFlowServiceStrategy.BUY
      // );
      const result = await BladeSdk.exchangeGetQuotes(
        'HBAR',
        2000,
        'USD',
        CryptoFlowServiceStrategy.SELL
      );
      console.log('exchangeGetQuotes:', result);
    } catch (e) {
      console.error('BladeSdk problem', e);
    }
  }

  async function getTradeUrlHandler() {
    try {
      console.log(
        'BUY:',
        await BladeSdk.getTradeUrl(
          CryptoFlowServiceStrategy.BUY,
          operatorAccountId,
          'USD',
          200,
          'HBAR',
          2,
          'transak'
        )
      );
      console.log(
        'SELL',
        await BladeSdk.getTradeUrl(
          CryptoFlowServiceStrategy.SELL,
          operatorAccountId,
          'HBAR',
          2000,
          'USD',
          2,
          'transak'
        )
      );
    } catch (e) {
      console.error('BladeSdk problem', e);
    }
  }

  return (
    <View style={styles.container}>
      <Button
        onPress={initHandler}
        title="initialize"
        color="#841584"
        accessibilityLabel=""
      />
      <Button
        onPress={infoHandler}
        title="getInfo"
        color="#841584"
        accessibilityLabel=""
      />
      <Button
        onPress={accountHandler}
        title="createAccount"
        color="#84e584"
        accessibilityLabel=""
      />
      <Button
        onPress={associateHandler}
        title="associateToken"
        color="#84e584"
        accessibilityLabel=""
      />
      <Button
        onPress={deleteAccountHandler}
        title="deleteAccount"
        color="#84e584"
        accessibilityLabel=""
      />
      <Button
        onPress={signHandler}
        title="sign"
        color="#8484e5"
        accessibilityLabel=""
      />
      <Button
        onPress={balanceHandler}
        title="getBalance"
        color="#ff84e5"
        accessibilityLabel=""
      />
      <Button
        onPress={transactionsHandler}
        title="getTransactions"
        color="#ff84e5"
        accessibilityLabel=""
      />
      <Button
        onPress={getCoinListHandler}
        title="getCoinList"
        color="#338433"
        accessibilityLabel=""
      />
      <Button
        onPress={getCoinPriceHandler}
        title="getCoinPrice"
        color="#338433"
        accessibilityLabel=""
      />
      <Button
        onPress={exchangeGetQuotesHandler}
        title="exchangeGetQuotes"
        color="#333384"
        accessibilityLabel=""
      />
      <Button
        onPress={getTradeUrlHandler}
        title="getTradeUrl"
        color="#333384"
        accessibilityLabel=""
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
