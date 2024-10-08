import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, TextInput, Linking, Button} from 'react-native';
import LoadingModal from '../components/modals/LoadingModal';
import fetch from '../utils/FetchWithTimeout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../contexts/AuthContext';
import Text from '../components/Text';

class LoginScreen extends Component {

  state = {
    email: '',
    senha: '',
    modalVisible: false,
  };

  async componentDidMount(){
    const email = await AsyncStorage.getItem("@SuaLavanderia:ultimoEmail");
    if(email){
      this.setState({email});
    }
  }

  localLogin = async () => {

    if(this.state.email.trim().length == 0 || this.state.senha.trim().length == 0){
      alert('Preencha o email e senha');
    }else{
      this.setState({modalVisible: true});

      var dataString = this.dataString();
      var md5 = require('md5');

      var hashDaSenha = md5(this.state.senha);
      var hashDaData = md5(dataString);

      var hash = md5(hashDaSenha + ':' + hashDaData);
      var email = this.state.email;

      try{
        const call = await fetch(`https://painel.sualavanderia.com.br/api/Login.aspx?login=${email}&senha=${hash}`, 
              { 
                  method: 'post' 
              });
        
        if(call.status == 200){
            var resposta = await call.json();
            var usuarioResponse = resposta[0];

            const usuario = {
              oid: usuarioResponse.Oid,
              nome: usuarioResponse.Nome,
              email: usuarioResponse.Email,
              papel: usuarioResponse.Papel,
              hashDaSenha: hashDaSenha,
            };
 
            await AsyncStorage.setItem("@SuaLavanderia:usuario", JSON.stringify(usuario));
            await AsyncStorage.setItem("@SuaLavanderia:ultimoEmail", usuario.email);
            this.setState({modalVisible: false});

            try{
              // this.props.navigation.navigate('Stack' + usuario.papel);
              this.context.login(usuario)
            }catch(erro){
              alert('Você não tem permissão para usar o aplicativo!');

              await AsyncStorage.removeItem("@SuaLavanderia:usuario");
              await AsyncStorage.removeItem("@SuaLavanderia:ultimoEmail");

              // this.props.navigation.navigate('Login');
            }
        }else{
          var mensagem = 'Erro ao tentar fazer o login! Erro: ' + call.status;

          if(call.statusText){
            mensagem += ' ' + call.statusText;
          }

          this.setState({modalVisible: false});
          alert(mensagem);
        }
      }catch(erro){
        this.setState({modalVisible: false});
        alert('Erro tentando fazer o login: ' + erro);
      }
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

  open = (redeSocial) => {
    switch(redeSocial){
      case 1: Linking.openURL("https://wa.me/558332684285") ; break;
      case 2: Linking.openURL("https://instagram.com/sualavanderia") ; break;
      case 3: Linking.openURL("https://facebook.com/sualavanderia.com.br") ; break;
      case 4: Linking.openURL("https://www.sualavanderia.com.br") ; break;
      case 5: Linking.openURL("https://www.sualavanderia.com.br/politica-de-privacidade.html") ; break;
    }
  };

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

            <Button
              title='Login' 
              onPress={() => this.localLogin()} 
              style={styles.button}
              color='green'>
              <Text style={styles.buttonText}>Login</Text>
            </Button>
          </View>

          <View style={styles.midiasSociais}>
            <TouchableOpacity onPress={() => this.open(1)}>
              <View style={styles.infoContainer}>
                  <Image source={require('../images/whatsapp_64x64.png')} style={styles.redesSociaisLogo} />
                  <Text style={styles.info}>(83) 3268-4285</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.open(2)}>
              <View style={styles.infoContainer}>
                  <Image source={require('../images/instagram_64x64.png')} style={styles.redesSociaisLogo} />
                  <Text style={styles.info}>Instagram</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.open(5)}>
              <View style={styles.infoContainer}>
                  <Image source={require('../images/politica-de-privacidade_32x32.png')} style={styles.redesSociaisLogo} />
                  <Text style={styles.info}>Política de Privacidade</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <LoadingModal modalVisible={this.state.modalVisible} />
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
    color: 'green',
    height: 40,
    width: 100,
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
  infoContainer: {
    marginTop: 50,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  redesSociaisLogo: {
    width: 32,
    height: 32,
  },
  midiasSociais: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

LoginScreen.contextType = AuthContext;
export default LoginScreen;