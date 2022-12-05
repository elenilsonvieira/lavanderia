import React from 'react';
import {StyleSheet, View, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import FechamentoDePonto from '../../components/FechamentoDePonto';
import Ponto from '../../components/Ponto';
import LoadingModal from '../../components/modals/LoadingModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetch from '../../utils/FetchWithTimeout';
import Text from '../../components/Text';

export default class FechamentoDePontoDetails extends React.Component {

    state ={
        objeto: {},
        pontos: [],
        modalVisible: false,
    };

    async componentWillMount(){
        const objeto = this.props.route.params.objeto;
        
        this.setState({objeto});

        this.buscar();
    }

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
    
    hash(usuario) {        
        var dataString = this.dataString();
        var md5 = require('md5');
    
        var hashDaSenha = usuario.hashDaSenha;
        var hashDaData = md5(dataString);
    
        var hash = md5(hashDaSenha + ':' + hashDaData);
    
        return hash;
    };

    async buscar() {
        var usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));//this.getUser();
        var hash = this.hash(usuario);
        var email = usuario.email;
        const oid = this.state.objeto.oid;

        this.setState({modalVisible: true});

        try{
            const call = await fetch(`http://painel.sualavanderia.com.br/api/BuscarPonto.aspx?fechamentoOid=${oid}&login=${email}&senha=${hash}`, 
                { 
                    method: 'post' 
                });
            const response = await call.json();
            var pontos = [];

            for(index in response){
                const objetoResponse = response[index];
                var batidas = [];    

                for(indexRoupa in objetoResponse.Batidas){
                    var batidaResposta = objetoResponse.Batidas[indexRoupa];
                    
                    if(batidaResposta){
                        const batida = {
                            hora: batidaResposta.Hora,
                        };

                        batidas = [...batidas, batida];
                    }
                }

                const objeto = {
                    oid: objetoResponse.Oid,
                    data: objetoResponse.Data,
                    horasTrabalhadas: objetoResponse.HorasTrabalhadas,
                    horasAbonadas: objetoResponse.HorasAbonadas,
                    pontoValido: objetoResponse.PontoValido,
                    batidas: batidas,
                };
                
                pontos = [...pontos, objeto];
            }

            this.setState({modalVisible: false, pontos});
        }catch (erro){
            this.setState({modalVisible: false});
            alert('Erro buscando ponto: ' + erro);
        }
    };

    openVideoInformativo = () => {
        Linking.openURL("http://sualavanderia.com.br/videos/FechamentoDePontoDetails.mp4");
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.infoTitle}>Fechamento de Ponto</Text>
                </View>
                <ScrollView>
                    <FechamentoDePonto objeto={this.state.objeto} />

                    <View style={styles.roupasContainer}>
                        <Text style={styles.roupasTitle}>Pontos</Text>
                    </View>
                    
                    { this.state.pontos.map(ponto => 
                        <Ponto key={ponto.oid} objeto={ponto} />
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
          header:{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFF',
            flexDirection: 'row',
            height: 40,
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
            width: 200,
            padding: 5,
        },
        buttonText: {
            fontWeight: 'bold',
        },
        unidadeContainer: {
            borderRadius: 5,
            backgroundColor: '#FFF',
            padding: 10,
            margin: 20,
            justifyContent: 'center',
        },
        lavagemInfoContainer: {
            flexDirection: 'row',
        },
        lavagemInfoContainerCliente: {
            alignItems: 'center',
        },
        lavagemInfoTitle: {
            fontWeight: 'bold',
        },
        lavagemInfo: {
        },
        lavagemInfoCliente: {
            fontSize: 20,
            fontWeight: 'bold',
        },
        button:{
            margin: 10,
        },
        icon: {
            width: 24,
            height: 24,
        },
        roupasContainer: {
            alignItems: 'center',
            backgroundColor: '#F8F8F8',
            borderRadius: 5, 
            marginLeft: 20,
            marginRight: 20,
        },
        roupasTitle: {
            fontSize: 18,
            fontWeight: 'bold',
        },
    }
);