import React from 'react';
import {StyleSheet, View, ScrollView, Image, Text, TextInput, TouchableOpacity, Picker, AsyncStorage, Linking } from 'react-native';

import BancoDeHoras from "../components/BancoDeHoras";
import LoadingModal from '../components/modals/LoadingModal';
import fetch from '../utils/FetchWithTimeout';

export default class BancoDeHorasScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Banco de Horas',
        drawerIcon: ({ tintColor }) => (
            <Image
            source={require('../images/bater-pontos_32x32.png')}
            style={styles.icon}
            />
        ),
    };

    state ={
        objetos: [],
        oid: '',
        objeto: {},
        fechamentos: [],
        pagamentos: [],
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

        var usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));
        var hash = this.hash(usuario);
        var email = usuario.email;

        var argumentos = `temContratoDeTrabalho=true&incluirFechamentosEPagamentos=false`;

        try{
            const call = await fetch(`http://painel.sualavanderia.com.br/api/BuscarBancoDeHoras.aspx?${argumentos}&login=${email}&senha=${hash}`, 
                { 
                    method: 'post' 
                });
            const response = await call.json();

            var objetos = [];

            for(index in response){
                const objetoResponse = response[index];
                var fechamentos = [];    
                var pagamentos = [];

                for(indexRoupa in objetoResponse.Fechamentos){
                    var fechamentoResposta = objetoResponse.Fechamentos[indexRoupa];
                    
                    if(fechamentoResposta){
                        const fechamento = {
                            oid: fechamentoResposta.Oid,
                            dataInicial: fechamentoResposta.DataInicial,
                            dataFinal: fechamentoResposta.DataFinal,
                            previsto: fechamentoResposta.Previsto,
                            realizado: fechamentoResposta.Realizado,
                            abonos: fechamentoResposta.Abonos,
                            saldo: fechamentoResposta.Saldo,
                        };

                        fechamentos = [...fechamentos, fechamento];
                    }
                }

                const objeto = {
                    oid: objetoResponse.Oid,
                    usuario: objetoResponse.Funcionario.Nome,
                    saldo: objetoResponse.Saldo,
                    fechamentos: fechamentos,
                    pagamentos: pagamentos,
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

    navegarParaDetalhes = (objeto) => {
        this.setState({objeto, oid: objeto.oid, fechamentos: objeto.fechamentos, pagamentos: objeto.pagamentos});
        this.props.navigation.navigate("BancoDeHorasDetails", { objeto: objeto});
    };

    openVideoInformativo = () => {
        Linking.openURL("http://sualavanderia.com.br/videos/BancoDeHorasScreen.mp4");
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.infoTitle}>Banco de Horas</Text>
                    <View style={styles.viewBotao}>
                        <TouchableOpacity onPress={this.openVideoInformativo} style={styles.button}>
                            <Image style={styles.icon} source={require('../images/pergunta_32x32.png')} />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.objetoList}>
                    {this.state.objetos.map(objeto => 
                        <TouchableOpacity key={objeto.oid} onPress={() => this.navegarParaDetalhes(objeto)}>
                            <BancoDeHoras key={objeto.oid} objeto={objeto} />
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