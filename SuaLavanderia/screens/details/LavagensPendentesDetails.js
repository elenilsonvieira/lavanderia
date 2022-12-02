import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Linking, Image } from 'react-native';

import Usuario from '../../components/Usuario';
import Lavagem from '../../components/Lavagem';
import LoadingModal from '../../components/modals/LoadingModal';
import fetch from '../../utils/FetchWithTimeout';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LavagensPendentesDetails extends React.Component {

    state ={
        oid: '',
        saldoDevedor: '0.0',
        modalVisible: false,
        objeto: null,
        lavagens: [],
    };

    async componentDidMount(){
        this.buscar();
    }

    dataToString = (data) => {
        var dia = data.getDate();
        var mes = data.getMonth() + 1;

        if(dia < 10){
            dia = '0' + dia;
        }

        if(mes < 10){
            mes = '0' + mes;
        }

        return dia + '/' + mes + '/' + data.getFullYear();
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

        const objeto = this.props.navigation.getParam('objeto');
        const oid = objeto.oid;

        var usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));//this.getUser();
        var hash = this.hash(usuario);
        var email = usuario.email;

        var argumentos = `clienteOid=${oid}`;

        try{
            const call = await fetch(`http://painel.sualavanderia.com.br/api/BuscarLavagensPendentes.aspx?${argumentos}&login=${email}&senha=${hash}`, 
                { 
                    method: 'post' 
                });
            const response = await call.json();

            var lavagens = [];
            var saldoDevedor = 0;

            for(index in response){
                const objetoResponse = response[index];
                saldoDevedor = objetoResponse.SaldoDevedor;

                for(indexLavagens in objetoResponse.Lavagens){
                    const lavagemResponse = objetoResponse.Lavagens[indexLavagens];
                    var roupas = [];

                    for(indexRoupa in lavagemResponse.Roupas){
                        const roupaResponse = lavagemResponse.Roupas[indexRoupa];

                        const roupaEmLavagem = {
                            oid: roupaResponse.Oid,
                            quantidade: roupaResponse.Quantidade,
                            observacoes: roupaResponse.Observacoes,
                            soPassar: roupaResponse.SoPassar,
                            cliente: roupaResponse.Cliente,
                            clienteOid: roupaResponse.ClienteOid,
                            codigoDoCliente: roupaResponse.CodigoDoCliente,
                            pacoteDeRoupa: roupaResponse.PacoteDeRoupa,
                            roupa: {
                                oid: roupaResponse.Roupa.Oid,
                                tipo: roupaResponse.Roupa.Tipo,
                                tecido: roupaResponse.Roupa.Tecido,
                                tamanho: roupaResponse.Roupa.Tamanho,
                                marca: roupaResponse.Roupa.Marca,
                                cliente: roupaResponse.Roupa.Cliente,
                                clienteOid: roupaResponse.Roupa.ClienteOid,
                                observacao: roupaResponse.Roupa.Observacao,
                                codigo: roupaResponse.Roupa.Codigo,
                                chave: roupaResponse.Roupa.Chave,
                                cores: roupaResponse.Roupa.Cores,
                            },
                        };

                        roupas = [...roupas, roupaEmLavagem];
                    }

                    var avaliacao = null;

                    if(lavagemResponse.Avaliacao){
                        avaliacao = {
                            data: lavagemResponse.Avaliacao.Data,
                            notaDoAtendimento: lavagemResponse.Avaliacao.NotaDoAtendimento,
                            notaDaLavagem: lavagemResponse.Avaliacao.NotaDaLavagem,
                            notaDaPassagem: lavagemResponse.Avaliacao.NotaDaPassagem,
                            notaDaEntrega: lavagemResponse.Avaliacao.NotaDaEntrega,
                            comentarios: lavagemResponse.Avaliacao.Comentarios,
                            media: (parseInt(lavagemResponse.Avaliacao.NotaDoAtendimento) + parseInt(lavagemResponse.Avaliacao.NotaDaLavagem) + parseInt(lavagemResponse.Avaliacao.NotaDaPassagem) + parseInt(lavagemResponse.Avaliacao.NotaDaEntrega)) / 4,//objetoResponse.Media,
                        };
                    }

                    const lavagem = {
                        oid: lavagemResponse.Oid,
                        cliente: lavagemResponse.Cliente,
                        clienteOid: lavagemResponse.ClienteOid,
                        codigoDoCliente: lavagemResponse.CodigoDoCliente,
                        dataDeRecebimento: lavagemResponse.DataDeRecebimento,
                        dataPreferivelParaEntrega: lavagemResponse.DataPreferivelParaEntrega,
                        horaPreferivelParaEntrega: lavagemResponse.HoraPreferivelParaEntrega,
                        empacotada: lavagemResponse.Empacotada,
                        soPassar: lavagemResponse.SoPassar,
                        dataDeEntrega: lavagemResponse.DataDeEntrega,
                        valor: lavagemResponse.Valor,
                        saldoDevedor: lavagemResponse.SaldoDevedor,
                        paga: lavagemResponse.Paga,
                        unidadeDeRecebimentoOid: lavagemResponse.UnidadeDeRecebimentoOid,
                        unidadeDeRecebimento: lavagemResponse.UnidadeDeRecebimento,
                        quantidadeDePecas: lavagemResponse.QuantidadeDePecas,
                        observacoes: lavagemResponse.Observacoes,
                        alertaAmarelo: lavagemResponse.AlertaAmarelo,
                        alertaVerde: lavagemResponse.AlertaVerde,
                        alertaVermelho: lavagemResponse.AlertaVermelho,
                        alertaCinza: lavagemResponse.AlertaCinza,
                        roupas: roupas,
                        status: lavagemResponse.Status,
                        avaliacao: avaliacao,
                    }; 

                    lavagens = [...lavagens, lavagem];
                }
            }

            this.setState({lavagens, saldoDevedor});
        }catch(erro){
            alert('Erro.' + erro);
        }

        this.setState({modalVisible: false});
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.infoTitle}>Lavagens Pendentes</Text>
                </View>

                <ScrollView>
                    <Usuario objeto={this.state.objeto ? this.state.objeto : this.props.navigation.getParam('objeto')} />

                    <View style={styles.roupasContainer}>
                        <Text style={styles.roupasTitle}>Total: R$ {this.state.saldoDevedor}</Text>
                        <Text style={styles.roupasTitle}>Lavagens Pendentes</Text>
                    </View>
                    
                    {
                        this.state.lavagens.map(objeto => 
                        <TouchableOpacity key={objeto.oid} onPress={() => this.props.navigation.navigate('LavagemDetails', { lavagem: objeto })}>
                            <Lavagem key={objeto.oid} lavagem={objeto} />
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
            justifyContent: 'center',
            height: 40,
            backgroundColor: '#FFF',
            flexDirection: 'row',
          },
          objetoList: {
              paddingTop: 20,
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
            padding: 5,
        },
        boxDate:{
            backgroundColor: "#DDD",
            height: 40,
            borderRadius: 5,
            alignSelf: 'stretch',
            padding: 5,
            paddingTop: 10,
            justifyContent: 'center',
            fontSize: 15,
            fontWeight: 'bold',
        },
        buttonText: {
            fontWeight: 'bold',
        },
        button:{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            margin: 10,
            padding: 10,
            backgroundColor: '#DDD',
        },
        movimentacaoContainer: {
            borderRadius: 5,
            backgroundColor: '#FFF',
            padding: 20,
            margin: 20,
            justifyContent: 'center',
        },
        movimentacaoInfoContainer: {
        },
        movimentacaoInfoContainerTitle: {
            alignItems: 'center',
        },
        valorInfoContainer: {
            flexDirection: 'row',
        },
        movimentacaoInfoTitle: {
            fontSize: 25,
            fontWeight: 'bold',
        },
        valorInfoTitle: {
            fontWeight: 'bold',
        },
        infoTitle: {
            fontWeight: 'bold',
            paddingTop: 10,
        },
        movimentacaoInfo: {
        },
        button:{
            padding: 10,
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