import React from 'react';
import {View, StatusBar, ActivityIndicator, StyleSheet} from 'react-native';
import fetch from '../utils/FetchWithTimeout';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LoadingLoginScreen extends React.Component {

    // async componentDidMount() {
    //   this.init();
    // }

    // init2 = async () => {
    //   this.props.navigation.navigate('Login');
    // }
  
    // init = async () => {

    //   var usuario;
    //   try{
    //     usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));
    //   }catch(exception){}
      
    //   var resultado = false;

    //   if(usuario){
    //     const email = usuario.email;
    //     const hashDaSenha = usuario.hashDaSenha;

    //     var dataString = this.dataString();
    //     var md5 = require('md5');
    //     var hashDaData = md5(dataString);

    //     var hash = md5(hashDaSenha + ':' + hashDaData);

    //     const call = await fetch(`https://painel.sualavanderia.com.br/api/Login.aspx?login=${email}&senha=${hash}`, 
    //           { 
    //               method: 'post' 
    //           }).then(async function(response){
    //             if(response.status == 200){          
    //               resultado = true;
    //             }else{
    //               await AsyncStorage.removeItem("@SuaLavanderia:usuario"); 
    //             }
    //           }
    //           ).catch(function(error){
    //           });
    //     }

    //   this.props.navigation.navigate(resultado ? ('Stack' + usuario.papel) : 'Login');
    // };

    // dataString = () => {
    //   var data = new Date();
      
    //   var dia = data.getDate();
    //   var mes = data.getMonth() + 1;
  
    //   if(dia < 10){
    //       dia = '0' + dia;
    //   }
  
    //   if(mes < 10){
    //       mes = '0' + mes;
    //   }
  
    //   return data.getFullYear() + '' + mes + '' + dia;
    // }
  
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