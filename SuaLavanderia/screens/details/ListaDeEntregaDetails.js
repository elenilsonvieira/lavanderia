import React from 'react';
import {StyleSheet, View, ScrollView, Image, Text, TouchableOpacity, Linking } from 'react-native';
import LavagemEmListaDeEntrega from '../../components/LavagemEmListaDeEntrega';
import LoadingModal from '../../components/modals/LoadingModal';
import ListaDeEntrega from '../../components/ListaDeEntrega';
import fetch from '../../utils/FetchWithTimeout';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ListaDeEntregaDetails extends React.Component {

    state ={
        modalVisible: false,
        confirmacaoModalVisible: false,
        objeto: {},
        lavagens: [],
    };

    async componentWillMount(){
        this.setState({modalVisible: true});

        const objeto = this.props.route.params.objeto;
        this.setState({objeto, lavagens: objeto.lavagens});

        this.setState({modalVisible: false});

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

    async buscar2() {
        alert('hey hou');
    };

    async buscar() {
        var usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));//this.getUser();
        var hash = this.hash(usuario);
        var email = usuario.email;
        const oid = this.state.objeto.oid;

        this.setState({modalVisible: true});

        try{
            const call = await fetch(`http://painel.sualavanderia.com.br/api/BuscarListaDeEntregaDeLavagens.aspx?oid=${oid}&login=${email}&senha=${hash}`, 
                { 
                    method: 'post' 
                });
            const response = await call.json();

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
                    lavagens: lavagens,
                };

                this.setState({objeto, lavagens});
            }

            this.setState({modalVisible: false});
        }catch (erro){
            this.setState({modalVisible: false});
            alert('Erro buscando lista: ' + erro);
        }
    };

    openModal = () => {
        this.setState({confirmacaoModalVisible: true});
    };

    closeModal = () => {
        this.setState({confirmacaoModalVisible: false});
    };

    navegarParaBuscarLavagens = () => {
        // alert('oid ' + Object.getOwnPropertyNames(this.state.lavagens[0].lavagem));
        this.props.navigation.navigate("LavagemParaListaDeEntrega", {objeto: this.state.objeto, buscar: this.buscar.bind(this)});
    };

    openVideoInformativo = () => {
        Linking.openURL("http://sualavanderia.com.br/videos/ListaDeEntregaDetails.mp4");
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.infoTitle}>Lista de Entrega</Text>
                    
                    <TouchableOpacity onPress={() => this.navegarParaBuscarLavagens()} style={styles.button}>
                        <Image style={styles.icon} source={require('../../images/novo_32x32.png')} />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <ListaDeEntrega objeto={this.state.objeto} />

                    <View style={styles.roupasContainer}>
                        <Text style={styles.roupasTitle}>Lavagens</Text>
                    </View>
                    
                    { this.state.lavagens.map(objeto => 
                        <TouchableOpacity key={objeto.oid} onPress={() => this.props.navigation.navigate('LavagemDetails', { lavagem: objeto.lavagem, inativarModal: true })}>
                            <LavagemEmListaDeEntrega key={objeto.lavagem.oid} objeto={objeto} />
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
    }
);