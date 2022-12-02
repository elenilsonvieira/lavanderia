import React from 'react';
import {StyleSheet, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import LoadingModal from '../components/modals/LoadingModal';
import Tipo from "../components/Tipo";
import fetch from '../utils/FetchWithTimeout';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class TipoScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Tipo',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../images/tipo-de-roupa_32x32.png')}
            style={styles.icon}
          />
        ),
      };

    state ={
        nome: '',
        tipos: [],
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

        try{
            const call = await fetch(`http://painel.sualavanderia.com.br/api/BuscarTipo.aspx?login=${email}&senha=${hash}`, 
                { 
                    method: 'post' 
                });
            const response = await call.json();

            var tipos = [];

            for(index in response){
                const tipoResponse = response[index];

                const tipo = {
                    oid: tipoResponse.Oid,
                    nome: tipoResponse.Nome,
                    valor: tipoResponse.Valor,
                };    

                tipos = [...tipos, tipo];
            }

            this.setState({tipos});
            await AsyncStorage.setItem("@SuaLavanderia:tipos", JSON.stringify(tipos));
        }catch(erro){
            alert('Erro.' + erro);
        }

        this.setState({modalVisible: false});
    };

    filtrar =  () => {        
        if(this.state.nome.trim() !== '') {
            var tipos = [];

            this.state.tipos.map(tipo => {
                if(tipo.nome.toLowerCase().includes(this.state.nome.toLowerCase())){ 
                    tipos = [...tipos, tipo];
                }
            });

            this.setState({tipos});
        }
    };

    async componentDidMount(){
        const tipos = await this.buscar() || [];
        this.setState(tipos);
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

                <ScrollView contentContainerStyle={styles.tipoList}>
                    {this.state.tipos.map(tipo => 
                        <Tipo key={tipo.oid} tipo={tipo} />
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
          tipoList: {
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