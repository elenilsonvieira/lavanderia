import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Linking, AsyncStorage, Image } from 'react-native';

import Usuario from '../../components/Usuario';
import Lavagem from '../../components/Lavagem';
import LoadingModal from '../../components/modals/LoadingModal';
import fetch from '../../utils/FetchWithTimeout';

export default class UsuarioDetails extends React.Component {

    state ={
        oid: '',
        modalVisible: false,
        objeto: null,
        lavagens: [],
    };

    async componentDidMount(){
        this.setState({objeto: this.props.navigation.getParam('objeto')});
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

        var hoje = new Date();
        var mesAnterior = new Date();
        mesAnterior.setMonth(mesAnterior.getMonth() -1);

        var mes = mesAnterior.getMonth() + 1;
        if(mes < 10){
            mes = '0' + mes;
        }

        var dia = hoje.getDate();
        if(dia < 10){
            dia = '0' + dia;
        }

        var dataInicial = dia + '/' + mes + '/' + mesAnterior.getFullYear();

        var mes = hoje.getMonth() + 1;
        if(mes < 10){
            mes = '0' + mes;
        }

        var dia = hoje.getDate();
        if(dia < 10){
            dia = '0' + dia;
        }

        var dataFinal = dia + '/' + mes + '/' + hoje.getFullYear();

        var dataInicialArray = dataInicial.split('/');
        var dataInicialParameter = dataInicialArray[2] + '-'+ dataInicialArray[1] + '-' + dataInicialArray[0];

        var dataFinalArray = dataFinal.split('/');
        var dataFinalParameter = dataFinalArray[2] + '-'+ dataFinalArray[1] + '-' + dataFinalArray[0];

        var argumentos = `clienteOid=${oid}&dataInicial=${dataInicialParameter}&dataFinal=${dataFinalParameter}`;

        try{
            const call = await fetch(`http://painel.sualavanderia.com.br/api/BuscarLavagem.aspx?${argumentos}&login=${email}&senha=${hash}`, 
                { 
                    method: 'post' 
                });
            const response = await call.json();

            var lavagens = [];

            for(index in response){
                const objetoResponse = response[index];
                var roupas = [];

                for(indexRoupa in objetoResponse.Roupas){
                    const roupaResponse = objetoResponse.Roupas[indexRoupa];

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

                if(objetoResponse.Avaliacao){
                    avaliacao = {
                        data: objetoResponse.Avaliacao.Data,
                        notaDoAtendimento: objetoResponse.Avaliacao.NotaDoAtendimento,
                        notaDaLavagem: objetoResponse.Avaliacao.NotaDaLavagem,
                        notaDaPassagem: objetoResponse.Avaliacao.NotaDaPassagem,
                        notaDaEntrega: objetoResponse.Avaliacao.NotaDaEntrega,
                        comentarios: objetoResponse.Avaliacao.Comentarios,
                        media: (parseInt(objetoResponse.Avaliacao.NotaDoAtendimento) + parseInt(objetoResponse.Avaliacao.NotaDaLavagem) + parseInt(objetoResponse.Avaliacao.NotaDaPassagem) + parseInt(objetoResponse.Avaliacao.NotaDaEntrega)) / 4,//objetoResponse.Media,
                    };
                }

                const objeto = {
                    oid: objetoResponse.Oid,
                    cliente: objetoResponse.Cliente,
                    clienteOid: objetoResponse.ClienteOid,
                    codigoDoCliente: objetoResponse.CodigoDoCliente,
                    dataDeRecebimento: objetoResponse.DataDeRecebimento,
                    dataPreferivelParaEntrega: objetoResponse.DataPreferivelParaEntrega,
                    horaPreferivelParaEntrega: objetoResponse.HoraPreferivelParaEntrega,
                    empacotada: objetoResponse.Empacotada,
                    soPassar: objetoResponse.SoPassar,
                    dataDeEntrega: objetoResponse.DataDeEntrega,
                    valor: objetoResponse.Valor,
                    saldoDevedor: objetoResponse.SaldoDevedor,
                    paga: objetoResponse.Paga,
                    unidadeDeRecebimentoOid: objetoResponse.UnidadeDeRecebimentoOid,
                    unidadeDeRecebimento: objetoResponse.UnidadeDeRecebimento,
                    quantidadeDePecas: objetoResponse.QuantidadeDePecas,
                    observacoes: objetoResponse.Observacoes,
                    alertaAmarelo: objetoResponse.AlertaAmarelo,
                    alertaVerde: objetoResponse.AlertaVerde,
                    alertaVermelho: objetoResponse.AlertaVermelho,
                    alertaCinza: objetoResponse.AlertaCinza,
                    roupas: roupas,
                    status: objetoResponse.Status,
                    avaliacao: avaliacao,
                };    

                lavagens = [...lavagens, objeto];
            }

            this.setState({lavagens});
        }catch(erro){
            alert('Erro.' + erro);
        }

        this.setState({modalVisible: false});
    };

    navegarParaDetalhes(props, movimentacaoEmCaixa){
        props.navigation.navigate('MovimentacaoDeCaixaDetails', {movimentacao: movimentacaoEmCaixa, reload: this.buscar.bind(this)});
    }

    navegarParaLavagensPendentes = () => {
        this.props.navigation.navigate('LavagensPendentesDetails', {objeto: this.state.objeto});
    }

    openVideoInformativo = () => {
        Linking.openURL("http://sualavanderia.com.br/videos/UsuarioDetails.mp4");
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.viewHeader}>
                        <TouchableOpacity onPress={this.navegarParaLavagensPendentes} style={styles.button}>
                            <Image style={styles.icon} source={require('../../images/Pendente_32x32.png')} />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView>
                    <Usuario objeto={this.state.objeto ? this.state.objeto : this.props.navigation.getParam('objeto')} />

                    <View style={styles.roupasContainer}>
                        <Text style={styles.roupasTitle}>Lavagens</Text>
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