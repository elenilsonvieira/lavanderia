/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

export default class SobreScreen extends Component {

  static navigationOptions = {
    drawerLabel: 'Sobre',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../images/sobre_32x32.png')}
        style={styles.icon}
      />
    ),
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../images/logo.png')} />
        <Text style={styles.welcome}>Aplicativo da Sua Lavanderia</Text>
        <Text style={styles.instructions}>Versão 20.07.9.1</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
  logo: {
    width: 56,
    height: 56,
  },
});