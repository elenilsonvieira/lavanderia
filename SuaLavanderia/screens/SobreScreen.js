/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View, TouchableOpacity, Image, Linking} from 'react-native';
import Text from '../components/Text';

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

  open = (redeSocial) => {
    switch(redeSocial){
      case 1: Linking.openURL("https://wa.me/558332684285") ; break;
      case 2: Linking.openURL("https://instagram.com/sualavanderia") ; break;
      case 3: Linking.openURL("https://facebook.com/sualavanderia.com.br") ; break;
      case 4: Linking.openURL("https://www.sualavanderia.com.br") ; break;
      case 5: Linking.openURL("https://www.sualavanderia.com.br/politica-de-privacidade.html") ; break;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../images/logo.png')} />
        <Text style={styles.welcome}>Aplicativo da Sua Lavanderia</Text>
        <Text style={styles.instructions}>Versão 24.9.23.6</Text>
        <Text style={styles.instructions}>@Copyright - Elenilson Vieira da Silva Filho</Text>

        <View style={styles.midiasSociais}>
          <TouchableOpacity onPress={() => this.open(1)}>
            <View style={styles.infoContainer}>
                <Image source={require('../images/whatsapp_64x64.png')} style={styles.redesSociaisLogo} />
                <Text style={styles.info}>(83) 3268-4285</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.open(2)}>
            <View style={styles.infoContainer}>
                <Image source={require('../images/instagram_64x64.png')} style={styles.redesSociaisLogo} />
                <Text style={styles.info}>Instagram</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.open(5)}>
            <View style={styles.infoContainer}>
                <Image source={require('../images/politica-de-privacidade_32x32.png')} style={styles.redesSociaisLogo} />
                <Text style={styles.info}>Política de Privacidade</Text>
            </View>
          </TouchableOpacity>
        </View>
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
  imagem: {
    margin: 20,
  },
  infoContainer: {
    marginTop: 50,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  redesSociaisLogo: {
    width: 32,
    height: 32,
  },
  midiasSociais: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});