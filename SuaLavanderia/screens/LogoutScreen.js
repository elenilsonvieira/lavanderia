import React from 'react';
import {View, StatusBar, ActivityIndicator, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../contexts/AuthContext';

class LogoutScreen extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Sair',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('../images/logout_32x32.png')}
          style={styles.icon}
        />
      ),
    };

    constructor(props) {
      super(props);
      this.init();
    }
  
    init = async () => {
      await AsyncStorage.removeItem("@SuaLavanderia:usuario");
      // this.props.navigation.navigate('Login');

      this.context.logout();
    };
  
    render() {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
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
  });

LogoutScreen.contextType = AuthContext;
export default LogoutScreen;