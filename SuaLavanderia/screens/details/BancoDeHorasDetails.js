import React from 'react';
import {StyleSheet, View, ScrollView, Image, Text, TouchableOpacity, Linking } from 'react-native';
import FechamentoDePonto from '../../components/FechamentoDePonto';
import LoadingModal from '../../components/modals/LoadingModal';
import BancoDeHoras from '../../components/BancoDeHoras';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetch from '../../utils/FetchWithTimeout';

export default class BancoDeHorasDetails extends React.Component {

    state ={
        objeto: {},
        fechamentos: [],
        pagamentos: [],
        modalVisible: false,
    };

    async componentWillMount(){
        const objeto = this.props.route.params.objeto;
        const fechamentos = objeto.fechamentos;
        const pagamentos = objeto.pagamentos;
        
        this.setState({objeto, fechamentos, pagamentos});

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

        var argumentos = `oid=${oid}&incluirFechamentosEPagamentos=true`;

        try{
            const call = await fetch(`http://painel.sualavanderia.com.br/api/BuscarBancoDeHoras.aspx?oid=${argumentos}&login=${email}&senha=${hash}`, 
                { 
                    method: 'post' 
                });
            const response = await call.json();

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

                for(indexRoupa in objetoResponse.Pagamentos){
                    var pagamentoResposta = objetoResponse.Pagamentos[indexRoupa];
                    
                    if(pagamentoResposta){
                        const pagamento = {
                            data: fechamentoResposta.Data,
                            quantidade: fechamentoResposta.Quantidade,
                            tipo: fechamentoResposta.Tipo,
                        };

                        pagamentos = [...pagamentos, pagamento];
                    }
                }

                const objeto = {
                    oid: objetoResponse.Oid,
                    usuario: objetoResponse.Funcionario.Nome,
                    saldo: objetoResponse.Saldo,
                    fechamentos: fechamentos,
                    pagamentos: pagamentos,
                };    

                this.setState({objeto, fechamentos, pagamentos});
            }

            this.setState({modalVisible: false});
        }catch (erro){
            this.setState({modalVisible: false});
            alert('Erro buscando material: ' + erro);
        }
    };

    navegarParaDetalhes = (objeto) => {
        this.props.navigation.navigate("FechamentoDePontoDetails", { objeto: objeto});
    };

    openVideoInformativo = () => {
        Linking.openURL("http://sualavanderia.com.br/videos/BancoDeHorasDetails.mp4");
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.infoTitle}>Bando de Horas</Text>
                    <View style={styles.viewBotao}>
                        <TouchableOpacity onPress={this.openVideoInformativo} style={styles.button}>
                            <Image style={styles.icon} source={require('../../images/pergunta_32x32.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <BancoDeHoras objeto={this.state.objeto} />

                    <View style={styles.roupasContainer}>
                        <Text style={styles.roupasTitle}>Fechamentos de Ponto</Text>
                    </View>
                    
                    { this.state.fechamentos.map(objeto => 
                        <TouchableOpacity key={objeto.oid} onPress={() => this.navegarParaDetalhes(objeto)}>
                            <FechamentoDePonto key={objeto.oid} objeto={objeto} />
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
        viewBotao: {
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
    }
);