import React from 'react';
import {View, StatusBar, ActivityIndicator, AsyncStorage, StyleSheet} from 'react-native';

export default class LoadingLoginScreen extends React.Component {
    constructor(props) {
      super(props);
      this.init();
    }
  
    init = async () => {
      const email = await AsyncStorage.getItem('email');
  
      this.props.navigation.navigate(email ? 'RootStack' : 'Login');
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