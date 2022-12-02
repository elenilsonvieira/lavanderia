import React from 'react';
import {StyleSheet, View, ScrollView, Image } from 'react-native';
import LoadingModal from '../components/modals/LoadingModal';
import Unidade from "../components/Unidade";
import fetch from '../utils/FetchWithTimeout';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class UnidadeScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Unidade',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../images/ponto-de-coleta_32x32.png')}
            style={styles.icon}
          />
        ),
      };

    state ={
        unidades: [],
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
            const call = await fetch(`http://painel.sualavanderia.com.br/api/BuscarUnidade.aspx?login=${email}&senha=${hash}`, 
                { 
                    method: 'post' 
                });
            const response = await call.json();

            var unidades = [];

            for(index in response){
                const unidadeResponse = response[index];

                const unidade = {
                    oid: unidadeResponse.Oid,
                    nome: unidadeResponse.Nome,
                    endereco: unidadeResponse.Endereco,
                    telefoneCelular: unidadeResponse.TelefoneMovel,
                    telefoneFixo: unidadeResponse.TelefoneConvencional,
                };    

                unidades = [...unidades, unidade];
            }

            this.setState({unidades});
        }catch(erro){
            alert('Erro.' + erro);
        }

        this.setState({modalVisible: false});
    };

    async componentDidMount(){
        const unidades = await this.buscar() || [];
        this.setState(unidades);
    }

    render(){
        return(
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.unidadeList}>
                    {this.state.unidades.map(unidade => 
                        <Unidade key={unidade.oid} unidade={unidade} />
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
          unidadeList: {
              paddingTop: 20,
          },
    }
);