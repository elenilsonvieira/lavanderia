import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import { reload } from '../utils/StorageUtils';
import LoadingModal from '../components/modals/LoadingModal';
import Text from '../components/Text';

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

  state = {
    loadingVisible: false,
  };

  async componentDidMount(){
    this.setState({modalVisible: true});
    reload();
    this.setState({modalVisible: false});
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../images/logo.png')} />
        <Text style={styles.welcome}>Bem Vindo!</Text>
        <Text style={styles.instructions}>Para abrir o menu, arraste o dedo do canto da tela da esquerda para a direita.</Text>
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
});