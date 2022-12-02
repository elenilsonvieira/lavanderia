import React from 'react';
import {StyleSheet, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import LoadingModal from '../components/modals/LoadingModal';
import Cor from "../components/Cor";
import fetch from '../utils/FetchWithTimeout';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class CorScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Cor',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../images/cor_32x32.png')}
            style={styles.icon}
          />
        ),
      };

    state ={
        nome: '',
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

    buscar = async () => {
        this.setState({modalVisible: true});

        var usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));//this.getUser();
        var hash = this.hash(usuario);
        var email = usuario.email;

        try{
            const call = await fetch(`http://painel.sualavanderia.com.br/api/BuscarCor.aspx?login=${email}&senha=${hash}`, 
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
                    valor: objetoResponse.Valor,
                };    

                objetos = [...objetos, objeto];
            }

            this.setState({objetos});
            await AsyncStorage.setItem("@SuaLavanderia:cores", JSON.stringify(objetos));
        }catch(erro){
            alert('Erro.' + erro);
        }

        this.setState({modalVisible: false});
    };

    filtrar =  () => {
        if(this.state.nome.trim() !== '') {
            var objetos = [];

            this.state.objetos.map(objeto => {
                if(objeto.nome.toLowerCase().includes(this.state.nome.toLowerCase())){ 
                    objetos = [...objetos, objeto];
                }
            });

            this.setState({objetos});
        }
    };

    async componentDidMount(){
        const objetos = await this.buscar() || [];
        this.setState(objetos);
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <TextInput
                        style={styles.boxInput} 
                        placeholder='Nome'
                        value={this.state.nome}
                        onChangeText={nome => this.setState({nome})} 
                    />

                    <TouchableOpacity onPress={this.filtrar} style={styles.button}>
                        <Image style={styles.icon} source={require('../images/pesquisar_32x32.png')} />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.objetoList}>
                    {this.state.objetos.map(objeto => 
                        <Cor key={objeto.oid} cor={objeto} />
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
        button:{
            padding: 10,
        },
        icon: {
            width: 24,
            height: 24,
        }
    }
);