import React from 'react';
import {StyleSheet, View, ScrollView, Image, Text, TextInput, TouchableOpacity, Linking } from 'react-native';
import ListaDeEntrega from "../components/ListaDeEntrega";
import LoadingModal from '../components/modals/LoadingModal';
import ConfirmacaoModalComInput from '../components/modals/ConfirmacaoModalComInput';
import fetch from '../utils/FetchWithTimeout';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class OperacaoListaDeEntregaDiretaScreen extends React.Component {

    state ={
        dataInicial: '',
        dataFinal: '',
        objetos: [],
        modalVisible: false,
        confirmacaoModalVisible: false,
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

        var hoje = new Date();
        var diasAtras = new Date();

        var dataInicial = this.state.dataInicial;
        var dataFinal = this.state.dataFinal;

        if(dataInicial == ''){
            var mes = diasAtras.getMonth() + 1;
            if(mes < 10){
                mes = '0' + mes;
            }

            var dia = diasAtras.getDate();
            if(dia < 10){
                dia = '0' + dia;
            }

            dataInicial = dia + '/' + mes + '/' + diasAtras.getFullYear();

            this.setState({dataInicial});
        }

        if(dataFinal == ''){
            var mes = hoje.getMonth() + 1;
            if(mes < 10){
                mes = '0' + mes;
            }

            var dia = hoje.getDate();
            if(dia < 10){
                dia = '0' + dia;
            }

            dataFinal = dia + '/' + mes + '/' + hoje.getFullYear();

            this.setState({dataInicial, dataFinal});
        }

        var dataInicialArray = dataInicial.split('/');
        var dataInicialParameter = dataInicialArray[2] + '-'+ dataInicialArray[1] + '-' + dataInicialArray[0];

        var dataFinalArray = dataFinal.split('/');
        var dataFinalParameter = dataFinalArray[2] + '-'+ dataFinalArray[1] + '-' + dataFinalArray[0];

        var usuarioOid = this.props.navigation.getParam('usuarioOid');
        const unidadeOid = this.props.navigation.getParam('unidadeOid');

        if(!usuarioOid){
            usuarioOid = usuario.oid;
        }

        var argumentos = `dataInicial=${dataInicialParameter}&dataFinal=${dataFinalParameter}&incluirLavagens=false&criarSeNaoExistir=true&usuarioOid=${usuarioOid}&unidadeOid=${unidadeOid}`;

        try{
            const call = await fetch(`http://painel.sualavanderia.com.br/api/BuscarListaDeEntregaDeLavagens.aspx?${argumentos}&login=${email}&senha=${hash}`, 
                { 
                    method: 'post' 
                });
            const response = await call.json();

            var objetos = [];

            for(index in response){
                const objetoResponse = response[index];
                var lavagens = [];

                for(indexLavagem in objetoResponse.Lavagens){
                    const lavagemResponse = objetoResponse.Lavagens[indexLavagem];

                    const lavagem = {
                        oid: lavagemResponse.Lavagem.Oid,
                        cliente: lavagemResponse.Lavagem.Cliente,
                        clienteOid: lavagemResponse.Lavagem.ClienteOid,
                        codigoDoCliente: lavagemResponse.Lavagem.CodigoDoCliente,
                        dataDeRecebimento: lavagemResponse.Lavagem.DataDeRecebimento,
                        dataPreferivelParaEntrega: lavagemResponse.Lavagem.DataPreferivelParaEntrega,
                        horaPreferivelParaEntrega: objetoResponse.HoraPreferivelParaEntrega,
                        empacotada: objetoResponse.Empacotada,
                        soPassar: objetoResponse.SoPassar,
                        dataDeEntrega: lavagemResponse.Lavagem.DataDeEntrega,
                        unidadeDeRecebimentoOid: lavagemResponse.Lavagem.UnidadeDeRecebimentoOid,
                        unidadeDeRecebimento: lavagemResponse.Lavagem.UnidadeDeRecebimento,
                        quantidadeDePecas: lavagemResponse.Lavagem.QuantidadeDePecas,
                        roupas: [],
                        status: lavagemResponse.Lavagem.Status,
                        recolhidaDoVaral: objetoResponse.RecolhidaDoVaral,
                        parcialmenteRecolhidaDoVaral: objetoResponse.ParcialmenteRecolhidaDoVaral,
                        recolhidaDoVaralString: objetoResponse.RecolhidaDoVaralString,
                    };

                    const lavagemEmLista = {
                        comentario: lavagemResponse.Comentario,
                        lavagem: lavagem,
                    };

                    lavagens = [...lavagens, lavagemEmLista];
                }

                const objeto = {
                    oid: objetoResponse.Oid,
                    status: objetoResponse.Status,
                    unidade: {
                        oid: objetoResponse.Unidade.Oid,
                        nome: objetoResponse.Unidade.Nome,
                    },
                    nome: objetoResponse.Nome,
                    data: objetoResponse.Data,
                    comentarioDoRecebedor: objetoResponse.ComentarioDoRecebedor,
                    quantidadeDeLavagens: objetoResponse.QuantidadeDeLavagens,
                    quantidadeDePecas: objetoResponse.QuantidadeDePecas,
                    lavagens: lavagens,
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

    dataInicialEscolhida = (dataEscolhida) => {
        //var dataEscolhidaString = dataString(dataEscolhida);

        var dia = dataEscolhida.getDate();
        var mes = dataEscolhida.getMonth() + 1;

        if(dia < 10){
            dia = '0' + dia;
        }

        if(mes < 10){
            mes = '0' + mes;
        }

        var dataEscolhidaString = dia + '/' + mes + '/' + dataEscolhida.getFullYear();

        this.setState({ 
            dataInicialPickerVisible: false,
            dataInicial: dataEscolhidaString,
        });
    }

    dataFinalEscolhida = (dataEscolhida) => {
        //var dataEscolhidaString = dataString(dataEscolhida);

        var dia = dataEscolhida.getDate();
        var mes = dataEscolhida.getMonth() + 1;

        if(dia < 10){
            dia = '0' + dia;
        }

        if(mes < 10){
            mes = '0' + mes;
        }

        var dataEscolhidaString = dia + '/' + mes + '/' + dataEscolhida.getFullYear();

        this.setState({ 
            dataFinalPickerVisible: false,
            dataFinal: dataEscolhidaString,
        });
    }

    acao = async (comentarios) => {
        this.setState({confirmacaoModalVisible: false, modalVisible: true});

        var usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));
        var hash = this.hash(usuario);
        var email = usuario.email;

        const lavagemOid = this.props.navigation.getParam('lavagemOid');

        var argumentos = `lavagemOid=${lavagemOid}&listaOid=${this.state.listaOid}&comentarios=${comentarios}`;

        try{
            const call = await fetch(`http://painel.sualavanderia.com.br/api/AdicionarLavagemEmListaDeEntrega.aspx?${argumentos}&login=${email}&senha=${hash}`, 
                { 
                    method: 'post' 
                });
            
            if(call.status != 200){
                alert('Erro.' + call.statusText);    
            }            
        }catch(erro){
            alert('Erro.' + erro);
        }

        this.setState({modalVisible: false});
        this.props.navigation.navigate("Home");
    };

    openModal = (listaOid) => {
        this.setState({confirmacaoModalVisible: true, listaOid});
    };
    
    closeModal = () => {
        this.setState({confirmacaoModalVisible: false});
    };

    openVideoInformativo = () => {
        Linking.openURL("http://sualavanderia.com.br/videos/OperacaoListaDeEntregaScreen.mp4");
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.infoTitle}>Clique em uma Lista de Entrega</Text>
                </View>

                <ScrollView contentContainerStyle={styles.objetoList}>
                    {this.state.objetos.map(objeto => 
                        <TouchableOpacity key={objeto.oid} onPress={() => this.openModal(objeto.oid)}>
                            <ListaDeEntrega objeto={objeto} />
                        </TouchableOpacity>
                    )}
                </ScrollView>

                <LoadingModal modalVisible={this.state.modalVisible} />
                <ConfirmacaoModalComInput visible={this.state.confirmacaoModalVisible} texto="Adicionar na lista?" inputText="Comentários" onSim={this.acao} onNao={this.closeModal} />
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
            justifyContent: 'center',
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