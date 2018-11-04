/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, AsyncStorage, TextInput} from 'react-native';

export default class LoginScreen extends Component {

  state = {
    email: '',
    senha: '',
  };

  login = async () => {
    await AsyncStorage.setItem('SuaLavanderia@email', this.state.email);
    await AsyncStorage.setItem('SuaLavanderia@senha', this.state.senha);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imagemContainer}>
          <Image source={require('../images/logo.png')} />
        </View>

        <View style={styles.boxContainer}>
          <TextInput
              style={styles.boxInput}
              autoFocus
              placeholder="Email"
              value={this.state.email}
              onChangeText={email => this.setState({email})}
          />
          
          <TextInput
              style={styles.boxInput}
              autoFocus
              placeholder="Senha"
              value={this.state.senha}
              onChangeText={senha => this.setState({senha})}
          />

          <TouchableOpacity 
            onPress={() => this.login} 
            style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
  },
  imagemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  logo: {
    width: 56,
    height: 56,
  },
   boxInput:{
    backgroundColor: "#DDD",
    alignSelf: "stretch",
    height: 40,
    margin: 5,
    width: '100%',
    borderRadius: 5,
  },
  button:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    margin: 10,
    padding: 20,
    backgroundColor: 'green',
    height: 40,
  },
  buttonText: {
      fontWeight: 'bold',
      color: '#FFF',
  },
  boxContainer: {
    borderRadius: 10,
    justifyContent: 'center',
    margin: 20,
    alignItems: 'center',
  },
});