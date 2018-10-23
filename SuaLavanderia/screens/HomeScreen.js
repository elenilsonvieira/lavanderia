import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default class HomeScreen extends Component {

  static navigationOptions = {
    drawerLabel: 'Início',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../images/home-icon.png')}
        style={styles.icon}
      />
    ),
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Bem Vindo!</Text>
        <Text style={styles.instructions}>Para abrir o menu, arraste o dedo da direita para a esquerda.</Text>
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
});