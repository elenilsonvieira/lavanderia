import React from 'react';
import {StyleSheet, View, ScrollView, Image, Text, TextInput, TouchableOpacity, Linking, AsyncStorage } from 'react-native';

import UsuarioOperacoes from "../components/UsuarioOperacoes";
import LoadingModal from '../components/modals/LoadingModal';
import fetch from '../utils/FetchWithTimeout';

export default class HomeScreenAplicativo extends React.Component {

    static navigationOptions = {
      drawerLabel: 'Início',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('../images/home-icon.png')}
          style={styles.icon}
        />
      ),
    };

    state ={
        objetos: [],
        modalVisible: false,
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
    };
    
    hash = (usuario) => {        
        var dataString = this.dataString();
        var md5 = require('md5');
    
        var hashDaSenha = usuario.hashDaSenha;
        var hashDaData = md5(dataString);
    
        var hash = md5(hashDaSenha + ':' + hashDaData);
    
        return hash;
    };
    
    getUser = async () => {
        var usuario;
    
        try{
          usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));
        }catch(exception){}
    
        return usuario;
    };

    buscar = async () => {
        this.setState({modalVisible: true});

        var usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));//this.getUser();
        var hash = this.hash(usuario);
        var email = usuario.email;

        var argumentos = `temContratoDeTrabalhoAtivo=true&papeis=SupervisorDeOperacoes;Operacoes`;

        try{
            const call = await fetch(`http://painel.sualavanderia.com.br/api/BuscarUsuario.aspx?${argumentos}&login=${email}&senha=${hash}`, 
                { 
                    method: 'post' 
                });
            const response = await call.json();

            var objetos = [];

            for(index in response){
                const objetoResponse = response[index];

                const objeto = {
                    oid: objetoResponse.Oid,
                    nome: objetoResponse.Nome,
                };    

                objetos = [...objetos, objeto];
            }

            this.setState({objetos});
        }catch(erro){
            alert('Erro.' + erro);
        }

        this.setState({modalVisible: false});
    };

    async componentDidMount(){
        const objetos = await this.buscar() || [];
        this.setState(objetos);
    }

    openVideoInformativo = () => {
        Linking.openURL("http://sualavanderia.com.br/videos/HomeScreenAplicativo.mp4");
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                  <Text style={styles.infoTitle}>Quem é você?</Text>
                  <View style={styles.viewBotao}>
                        <TouchableOpacity onPress={this.openVideoInformativo} style={styles.button}>
                            <Image style={styles.icon} source={require('../images/pergunta_32x32.png')} />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.objetoList}>
                    {this.state.objetos.map(objeto => 
                        <TouchableOpacity key={objeto.oid} onPress={() => this.props.navigation.navigate('Operacoes', {usuarioOid: objeto.oid})}>
                            <UsuarioOperacoes key={objeto.oid} objeto={objeto} />
                        </TouchableOpacity>
                    )}
                </ScrollView>

                <LoadingModal modalVisible={this.state.modalVisible} />
            </View>
        );
    }

}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: '#333',
          },
          objetoList: {
              paddingTop: 20,
          },
          header:{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFF',
            flexDirection: 'row',
          },
          headerText: {
              fontSize: 22,
              fontWeight: 'bold', 
          },
          boxInput:{
            backgroundColor: "#DDD",
            height: 40,
            borderRadius: 5,
            alignSelf: 'stretch',
            width: 250,
            padding: 5,
        },
        buttonText: {
            fontWeight: 'bold',
        },
        button:{
            margin: 10,
        },
        viewHeader: {
            flexDirection: 'row',
        },
        viewHeaderSegundaLinha: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        boxDate:{
            height: 40,
            borderRadius: 5,
            padding: 5,
            paddingTop: 10,
            justifyContent: 'center',
            fontSize: 15,
            fontWeight: 'bold',
        },
        picker:{
            height: 40,
            width: 150,
            borderRadius: 15,
            padding: 5,
        },
        infoTitle: {
            fontWeight: 'bold',
            margin: 10,
        },
        viewBotao: {
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
        icon: {
            width: 24,
            height: 24,
        },
    }
);