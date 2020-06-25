import React from 'react';
import {StyleSheet, View, ScrollView, Image, Text, TextInput, TouchableOpacity, Picker, AsyncStorage, Linking } from 'react-native';

import MaterialPapelOperacoes from "../components/MaterialPapelOperacoes";
import LoadingModal from '../components/modals/LoadingModal';
import ConfirmacaoModalComQuantidade from '../components/modals/ConfirmacaoModalComQuantidade';
import fetch from '../utils/FetchWithTimeout';

export default class OperacaoRetirarMaterialScreen extends React.Component {

    state ={
        objetos: [],
        materialOid: '',
        quantidade: 0,
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

        var argumentos = `ativo=true`;

        try{
            const call = await fetch(`http://painel.sualavanderia.com.br/api/BuscarMaterial.aspx?${argumentos}&login=${email}&senha=${hash}`, 
                { 
                    method: 'post' 
                });
            const response = await call.json();

            var objetos = [];

            for(index in response){
                const objetoResponse = response[index];
                var movimentacoes = [];

                

                for(indexRoupa in objetoResponse.Movimentacoes){
                    var movimentacaoResposta = objetoResponse.Movimentacoes[indexRoupa];
                    
                    if(movimentacaoResposta){
                        const movimentacaoDeMaterial = {
                            oid: movimentacaoResposta.Oid,
                            materialOid: movimentacaoResposta.MaterialOid,
                            data: movimentacaoResposta.Data,
                            modo: movimentacaoResposta.Modo,
                            quantidade: movimentacaoResposta.Quantidade,
                            usuario: movimentacaoResposta.Usuario,
                        };

                        movimentacoes = [...movimentacoes, movimentacaoDeMaterial];
                    }
                }

                const objeto = {
                    oid: objetoResponse.Oid,
                    nome: objetoResponse.Nome,
                    detalhes: objetoResponse.Detalhes,
                    fornecedor: objetoResponse.Fornecedor,
                    estoque: objetoResponse.Estoque,
                    minimoEmEstoque: objetoResponse.MinimoEmEstoque,
                    mediaDeDiasDeUmaUnidade: objetoResponse.MediaDeDiasDeUmaUnidade,
                    proximaCompra: objetoResponse.ProximaCompra,
                    ultimaMovimentacao: objetoResponse.UltimaMovimentacao,
                    ativo: objetoResponse.ativo,
                    alertaAmarelo: objetoResponse.AlertaAmarelo,
                    alertaVermelho: objetoResponse.AlertaVermelho,
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

    openModal = (materialOid) => {
        this.setState({confirmacaoModalVisible: true, materialOid});
    };
    
    closeModal = () => {
        this.setState({confirmacaoModalVisible: false});
    };

    definirQuantidade = (quantidade) => {
        this.setState({quantidade});
    };

    acao = async (quantidade) => {
        this.setState({confirmacaoModalVisible: false, modalVisible: true, quantidade});

        var usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));
        var hash = this.hash(usuario);
        var email = usuario.email;
        var usuarioOid = this.props.navigation.getParam('usuarioOid');
        var usarUsuarioLogado = false;

        if(!usuarioOid){
            usuarioOid = usuario.oid;
            usarUsuarioLogado = true;
        }

        var argumentos = `materialOid=${this.state.materialOid}&usuarioOid=${usuarioOid}&quantidade=${this.state.quantidade}&modo=saida`;

        try{
            const call = await fetch(`http://painel.sualavanderia.com.br/api/AdicionarMovimentacaoDeMaterial.aspx?${argumentos}&login=${email}&senha=${hash}`, 
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

        if(usarUsuarioLogado){
            this.buscar();
        }else{
            this.props.navigation.navigate('Home');
        }
    };

    openVideoInformativo = () => {
        Linking.openURL("http://sualavanderia.com.br/videos/OperacaoRetirarMaterialScreen.mp4");
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.infoTitle}>Clique em um Material</Text>
                    <View style={styles.viewBotao}>
                        <TouchableOpacity onPress={this.openVideoInformativo} style={styles.button}>
                            <Image style={styles.icon} source={require('../images/pergunta_32x32.png')} />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.objetoList}>
                    {this.state.objetos.map(objeto => 
                        <TouchableOpacity key={objeto.oid} onPress={() => this.openModal(objeto.oid)}>
                            <MaterialPapelOperacoes key={objeto.oid} material={objeto} />
                        </TouchableOpacity>
                    )}
                </ScrollView>

                <LoadingModal modalVisible={this.state.modalVisible} />
                <ConfirmacaoModalComQuantidade visible={this.state.confirmacaoModalVisible} 
                texto="Remover quantos?" onSim={this.acao} onNao={this.closeModal} definirQuantidade={this.definirQuantidade} />
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