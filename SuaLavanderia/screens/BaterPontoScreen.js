import React from 'react';
import {StyleSheet, View, ScrollView, Image, Text, AsyncStorage, TouchableOpacity, Linking } from 'react-native';
import BatidaSimples from '../components/BatidaSimples';

import LoadingModal from '../components/modals/LoadingModal';
import fetch from '../utils/FetchWithTimeout';

export default class BaterPontoScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Bater Ponto',
        drawerIcon: ({ tintColor }) => (
            <Image
            source={require('../images/dedo_32x32.png')}
            style={styles.icon}
            />
        ),
    };

    state ={
        objeto: {},
        batidas: [],
        modalVisible: false,
    };

    async componentWillMount(){
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
            const call = await fetch(`http://painel.sualavanderia.com.br/api/BuscarPonto2.aspx?login=${email}&senha=${hash}`, 
                { 
                    method: 'post' 
                });

            const response = await call.json();

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
                    batidas: batidas,
                };    

                this.setState({objeto, batidas});
            }

            this.setState({modalVisible: false});
        }catch (erro){
            this.setState({modalVisible: false});
            alert('Erro buscando ponto: ' + erro);
        }
    };

    navegarParaDetalhes = (objeto) => {
        //this.props.navigation.navigate("FechamentoDePontoDetails", { objeto: objeto});
    };

    openVideoInformativo = () => {
        //Linking.openURL("http://sualavanderia.com.br/videos/BancoDeHorasDetails.mp4");
    };

    baterPonto = async () => {
        var usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));//this.getUser();
        var hash = this.hash(usuario);
        var email = usuario.email;
        const oid = this.state.objeto.oid;

        this.setState({modalVisible: true});
        
        try{
            const latitude = -7.072050;
            const longitude = -34.845158;


            const call = await fetch(`http://painel.sualavanderia.com.br/api/BaterPonto.aspx?latitude=${latitude}&longitude=${longitude}&login=${email}&senha=${hash}`, 
                { 
                    method: 'post' 
                });
            const response = await call.json();

            alert('Ponto batido com sucesso!');

            this.buscar();

            this.setState({modalVisible: false});
        }catch (erro){
            this.setState({modalVisible: false});
            alert('Erro batendo ponto: ' + erro);
        }
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.infoTitle}>Bater Ponto</Text>
                    <View style={styles.viewBotao}>
                        <TouchableOpacity onPress={this.baterPonto} style={styles.button}>
                            <Image style={styles.icon} source={require('../images/dedo_32x32.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <View style={styles.roupasContainer}>
                        <Text style={styles.roupasTitle}>Batidas</Text>
                    </View>
                    
                    { this.state.batidas.map(objeto => 
                        <BatidaSimples key={objeto.oid} objeto={objeto} />
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
            margin: 20,
        },
        baterPontoContainer: {
            alignItems: 'center',
            backgroundColor: 'grey',
            borderRadius: 5, 
            marginLeft: 20,
            marginRight: 20,
        },
        roupasTitle: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        viewBotao: {
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
    }
);