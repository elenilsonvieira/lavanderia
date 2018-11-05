import React from 'react';
import {View, StatusBar, ActivityIndicator, AsyncStorage, StyleSheet} from 'react-native';

export default class LoadingLoginScreen extends React.Component {

    async componentDidMount() {
      this.init();
    }
  
    init = async () => {
      const usuario = JSON.parse(await AsyncStorage.getItem("SuaLavanderia@usuario"));
      var resultado = false;

      if(usuario){
        const email = usuario.email;
        const hash = usuario.hashDaSenha;

        const call = await fetch(`http://painel.sualavanderia.com.br/api/Login.aspx?login=${email}&senha=${hash}`, 
              { 
                  method: 'post' 
              }).then(async function(response){
                if(response.status == 200){          
                  resultado = true;
                }else{
                  await AsyncStorage.removeItem("SuaLavanderia@usuario"); 
                }
              }
              ).catch(function(error){
              });
        }

      this.props.navigation.navigate(resultado ? 'RootStack' : 'Login');
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