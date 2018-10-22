/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class Home extends Component {

  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./images/home-icon.png')}
        style={styles.icon}
      />
    ),
  };

  state = {
    latitude: 0,
    longitude: 0,
  };

  requestLocationSuccess = (position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    this.setState(
      {
        latitude: latitude, 
        longitude: longitude
      });
  }

  requestLocation = () => {
    navigator.geolocation.getCurrentPosition(this.requestLocationSuccess);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>Latitude: {this.state.latitude}</Text>
        <Text style={styles.instructions}>Longitude: {this.state.longitude}</Text>
        
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home2', {instructions: instructions})}>
          <Text>Botão</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.requestLocation}>
          <Text>GPS</Text>
        </TouchableOpacity>
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