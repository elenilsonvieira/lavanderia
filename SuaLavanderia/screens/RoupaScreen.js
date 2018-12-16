import React from 'react';
import {StyleSheet, AsyncStorage, View, TouchableOpacity, TextInput, Image } from 'react-native';
import LoadingModal from '../components/modals/LoadingModal';
import Roupa from "../components/Roupa";

export default class RoupaScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Roupa',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../images/roupa_32x32.png')}
            style={styles.icon}
          />
        ),
      };

    state ={
        chave: '',
        roupa: {
            tipo: '',
            tecido: '',
            tamanho: '',
            marca: '',
            observacao: '',
            codigo: '',
            cliente: '',
            clienteOid: '',
            chave: '',
            cores: '',
        },
        modalVisible: false,
    };

    novaRoupa = () => {
        var roupa = {
            tipo: '',
            tecido: '',
            tamanho: '',
            marca: '',
            observacao: '',
            codigo: '',
            cliente: '',
            clienteOid: '',
            chave: '',
            cores: '',
        };

        return roupa;
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

        try{
            const roupaCall = await fetch(`http://painel.sualavanderia.com.br/api/BuscarRoupa.aspx?oid=${this.state.chave}&login=${email}&senha=${hash}`, 
                { 
                    method: 'post' 
                });

            const response = await roupaCall.json();
            var roupaResponse = response[0];

            const roupa = {
                tipo: roupaResponse.Tipo,
                tecido: roupaResponse.Tecido,
                tamanho: roupaResponse.Tamanho,
                marca: roupaResponse.Marca,
                observacao: roupaResponse.Observacao,
                codigo: roupaResponse.Codigo,
                chave: roupaResponse.Chave,
                cliente: roupaResponse.Cliente,
                clienteOid: roupaResponse.ClienteOid,
                cores: roupaResponse.Cores,
            };

            this.setState({roupa, modalVisible: false});
        }catch(erro){
            alert('Erro. ' + erro);
            this.setState({modalVisible: false});
        }
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <TextInput
                        style={styles.boxInput} 
                        placeholder='Chave'
                        keyboardType={this.state.chave.length < 3 ? 'default' : 'numeric'}
                        value={this.state.chave}
                        autoFocus
                        onChangeText={chave => this.setState({chave})} 
                    />

                    <TouchableOpacity onPress={this.buscar} style={styles.button}>
                        <Image style={styles.icon} source={require('../images/pesquisar_32x32.png')} />
                    </TouchableOpacity>
                </View>

                <Roupa roupa={this.state.roupa} />

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
          header:{
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 40,
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
        roupaContainer: {
            borderRadius: 5,
            backgroundColor: '#FFF',
            padding: 20,
            margin: 20,
            justifyContent: 'center',
        },
        roupaInfoContainer: {
            flexDirection: 'row',
        },
        roupaInfoTitle: {
            fontWeight: 'bold',
        },
        roupaInfo: {
        },
        button:{
            padding: 10,
        },
        icon: {
            width: 24,
            height: 24,
        }
    }
);