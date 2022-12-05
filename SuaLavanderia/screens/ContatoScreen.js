import React from 'react';
import {View, StyleSheet, Image, Linking, TouchableOpacity} from 'react-native';
import fetch from '../utils/FetchWithTimeout';
import Text from '../components/Text';

export default class LogoutScreen extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Contato',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('../images/atendente_32x32.png')}
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
      }
    };
  
    render() {
      return (
        <View style={styles.container}>
          <Image source={require('../images/atendente_128x128.png')} style={styles.image} />
          <Text style={styles.title}>Deseja entrar em contato conosco?</Text>
          <Text style={styles.title2}>É só clicar em uma das opções abaixo!</Text>

          <TouchableOpacity onPress={() => this.open(1)}>
            <View style={styles.infoContainer}>
                <Image source={require('../images/whatsapp_64x64.png')} style={styles.logo} />
                <Text style={styles.info}>Whatsapp</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.open(2)}>
            <View style={styles.infoContainer}>
                <Image source={require('../images/instagram_64x64.png')} style={styles.logo} />
                <Text style={styles.info}>Instagram</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.open(3)}>
            <View style={styles.infoContainer}>
                <Image source={require('../images/facebook_64x64.png')} style={styles.logo} />
                <Text style={styles.info}>Facebook</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.open(4)}>
            <View style={styles.infoContainer}>
                <Image source={require('../images/mundo_64x64.png')} style={styles.logo} />
                <Text style={styles.info}>Site</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.title3}>Manaíra: Av. Esperança, 1088A. 58038-280</Text>
          <Text style={styles.title3}>Bessa: Av. Nilo Peçanha, 244, Loja 106. 58035-200</Text>
          <Text style={styles.title3}>João Pessoa - PB</Text>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      width: 24,
      height: 24,
    },
    image: {
      width: 64,
      height: 64,
    },
    logo: {
      width: 32,
      height: 32,
    },
    infoContainer: {
      margin: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    infoTitle: {
        fontWeight: 'bold',
    },
    info: {
    },
    title: {
      fontSize: 15,
      textAlign: 'center',
    },
    title2: {
      fontSize: 15,
      textAlign: 'center',
      marginBottom: 30,
    },
    title3: {
      fontSize: 15,
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });