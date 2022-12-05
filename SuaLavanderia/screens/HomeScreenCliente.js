import React, {Component} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Linking} from 'react-native';
import { reload } from '../utils/StorageUtils';
import LoadingModal from '../components/modals/LoadingModal';
import Text from '../components/Text';

export default class HomeScreenCliente extends Component {

  static navigationOptions = {
    drawerLabel: 'Início',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../images/home-icon.png')}
        style={styles.icon}
      />
    ),
  };

  state = {
    loadingVisible: false,
  };

  async componentDidMount(){
    this.setState({modalVisible: true});
    reload();
    this.setState({modalVisible: false});
  }

  open = (redeSocial) => {
    switch(redeSocial){
      case 1: Linking.openURL("https://wa.me/558332684285") ; break;
      case 2: Linking.openURL("https://instagram.com/sualavanderia") ; break;
      case 3: Linking.openURL("https://facebook.com/sualavanderia.com.br") ; break;
      case 4: Linking.openURL("https://www.sualavanderia.com.br") ; break;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../images/logo.png')} />
        <Text style={styles.welcome}>Bem Vindo!</Text>
        <Text style={styles.instructions}>Para abrir o menu, arraste o dedo do canto da tela da esquerda para a direita.</Text>

        <TouchableOpacity onPress={() => this.open(1)}>
          <View style={styles.infoContainer}>
              <Image source={require('../images/whatsapp_64x64.png')} style={styles.logo} />
              <Text style={styles.info}>Fale Conosco Agora</Text>
              <Text style={styles.info}>(83) 3268-4285</Text>
          </View>
        </TouchableOpacity>

        <LoadingModal modalVisible={this.state.modalVisible} text="Carregando Informações. Aguarde!" />
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
  infoContainer: {
    marginTop: 50,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 40,
    height: 40,
  },
  info: {
  },
});