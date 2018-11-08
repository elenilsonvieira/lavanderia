/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, AsyncStorage, TextInput} from 'react-native';

export default class LoginScreen extends Component {

  state = {
    email: '',
    senha: '',
  };

  login = async () => {
    if(this.state.email.trim().length == 0 || this.state.senha.trim().length == 0){
      alert('Preencha o email e senha');
    }else{
      var dataString = this.dataString();
      var md5 = require('md5');

      var hashDaSenha = md5(this.state.senha);
      var hashDaData = md5(dataString);

      var hash = md5(hashDaSenha + ':' + hashDaData);

      var props = this.props;
      var email = this.state.email;

      const call = await fetch(`http://painel.sualavanderia.com.br/api/Login.aspx?login=${email}&senha=${hash}`, 
            { 
                method: 'post' 
            }).then(async function(response){
              if(response.status == 200){
                var resposta = await response.json();
                var usuarioResponse = resposta[0];

                const usuario = {
                  nome: usuarioResponse.Nome,
                  email: usuarioResponse.Email,
                  papel: usuarioResponse.Papel,
                  hashDaSenha: hashDaSenha,
                };

                await AsyncStorage.setItem("@SuaLavanderia:usuario", JSON.stringify(usuario));
          
                props.navigation.navigate('RootStack');
              }else{
                var mensagem = 'Erro ao tentar fazer o login!';

                if(response.statusText){
                  mensagem += ' ' + response.statusText;
                }

                alert(mensagem);
              }
            }
            ).catch(function(error){
                alert('Erro tentando fazer o login: ' + error);
            });
    }
  };

  dataString = () => {
    var data = new Date();
    
    var dia = data.getDate();
    var mes = data.getMonth() + 1;

    if(dia < 10){
        dia = '0' + dia;
    }

    if(mes < 10){
        mes = '0' + mes;
    }

    return data.getFullYear() + '' + mes + '' + dia;
  }

  render() {
    return (
      <View style={styles.container}>
        <View>          
          <View style={styles.boxContainer}>
            <Image style={styles.imagem} source={require('../images/logo.png')} />

            <TextInput
                style={styles.boxInput}
                autoFocus
                placeholder="Email"
                autoCapitalize='none'
                keyboardType='email-address'
                value={this.state.email}
                onChangeText={email => this.setState({email})}
            />
            
            <TextInput
                style={styles.boxInput}
                placeholder="Senha"
                autoCapitalize='none'
                secureTextEntry={true}
                value={this.state.senha}
                onChangeText={senha => this.setState({senha})}
            />

            <TouchableOpacity 
              onPress={() => this.login()} 
              style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
  },
  imagemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  logo: {
    width: 56,
    height: 56,
  },
   boxInput:{
    backgroundColor: "#DDD",
    alignSelf: "stretch",
    height: 40,
    margin: 5,
    width: '100%',
    borderRadius: 5,
  },
  button:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    margin: 10,
    padding: 20,
    backgroundColor: 'green',
    height: 40,
  },
  buttonText: {
      fontWeight: 'bold',
      color: '#FFF',
  },
  boxContainer: {
    borderRadius: 10,
    justifyContent: 'center',
    margin: 20,
    alignItems: 'center',
  },
  imagem: {
    margin: 20,
  },
});