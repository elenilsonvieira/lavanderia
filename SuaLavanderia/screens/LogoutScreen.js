import React from 'react';
import {View, StatusBar, ActivityIndicator, AsyncStorage, StyleSheet} from 'react-native';

export default class LogoutScreen extends React.Component {
    constructor(props) {
      super(props);
      this.init();
    }
  
    init = async () => {
      AsyncStorage.removeItem('email');
      AsyncStorage.removeItem('hash');
  
      this.props.navigation.navigate('Login');
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
  });