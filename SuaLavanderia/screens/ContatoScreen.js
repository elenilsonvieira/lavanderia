import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

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
        case 1:  ; break;
      }
    };
  
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.info}>Deseja entrar em contato conosco? É só clicar em uma das opções abaixo!</Text>

          <TouchableOpacity onPress={() => this.open(1)}>
            <View style={styles.infoContainer}>
                <Image source={require('../images/whatsapp_32x32.png')} style={styles.icon} />
                <Text style={styles.info}>Whatsapp</Text>
            </View>
          </TouchableOpacity>
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
    infoContainer: {
      flexDirection: 'row',
    },
    infoTitle: {
        fontWeight: 'bold',
    },
    info: {
    },
  });