import * as React from 'react';

import { StyleSheet, View, Button } from 'react-native';
import BladeSdk, { BladeEnv, Network } from 'react-native-blade-sdk';
import { Buffer } from 'buffer';

export default function App() {
  async function initHandler() {
    try {
      const res = await BladeSdk.initialize(
        'FG9dUBQcBaBAPgCHz7DqmNZzrJyhewAMJytjwp3VFIEMFTXQyVSIDq6wRvtPcSAt',
        'unitysdktest',
        Network.Testnet,
        BladeEnv.CI,
        true
      );
      console.log('INIT:', res, res.apiKey);
    } catch (e) {
      console.error('BladeSdk problem', e);
    }
  }

  async function accountHandler() {
    try {
      const accountResult = await BladeSdk.createAccount(
        '3030020100300706052b8104000a0422042047203b26c99c5f002d3b5c38b6bcd2ab46de8ad3fa90c5a39dcfdc5904dfa9a0',
        ''
      );
      console.log('ACCOUNT:', accountResult);
    } catch (e) {
      console.error('BladeSdk problem', e);
    }
  }

  async function signHandler() {
    try {
      const signResult = await BladeSdk.sign(
        Buffer.from('Hello, World!').toString('base64'),
        '3030020100300706052b8104000a0422042047203b26c99c5f002d3b5c38b6bcd2ab46de8ad3fa90c5a39dcfdc5904dfa9a0'
      );
      console.log('SIGN:', signResult);
    } catch (e) {
      console.error('BladeSdk problem', e);
    }
  }

  async function testHandler() {
    // try {
    //   const res = await BladeSdk.multiply(7, 8);
    //   console.log('TEST:', res);
    // } catch (e) {
    //   console.error('BladeSdk problem', e);
    // }
  }

  return (
    <View style={styles.container}>
      <Button
        onPress={initHandler}
        title="Init"
        color="#841584"
        accessibilityLabel=""
      />
      <Button
        onPress={accountHandler}
        title="Create Account"
        color="#84e584"
        accessibilityLabel=""
      />
      <Button
        onPress={signHandler}
        title="Sign"
        color="#8484e5"
        accessibilityLabel=""
      />
      <Button
        onPress={testHandler}
        title="TEST"
        color="#ff84e5"
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
