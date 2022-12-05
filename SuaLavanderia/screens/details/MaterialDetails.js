import React from 'react';
import {StyleSheet, View, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import MovimentacaoDeMaterial from '../../components/MovimentacaoDeMaterial';
import LoadingModal from '../../components/modals/LoadingModal';
import Material from '../../components/Material';
import ConfirmacaoModalMaterial from '../../components/modals/ConfirmacaoModalMaterial';
import fetch from '../../utils/FetchWithTimeout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Text from '../../components/Text';

export default class MaterialDetails extends React.Component {

    state ={
        nome: '',
        modalVisible: false,
        confirmacaoModalVisible: false,
        materialOid: '',
        material: {},
        movimentacoes: [],
    };

    MaterialDetails(){
        this.buscar = this.buscar.bind(this);
    }

    async componentDidMount(){
        const materialOid = this.props.route.params.materialOid;
        const reload = true;//this.props.route.params.('reload');
        this.setState({materialOid});

        if(reload){
            this.buscar();
        }
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
        const materialOid = this.state.materialOid;

        this.setState({modalVisible: true});

        try{
            const call = await fetch(`http://painel.sualavanderia.com.br/api/BuscarMaterial.aspx?incluirMovimentacoes=true&oid=${materialOid}&login=${email}&senha=${hash}`, 
                { 
                    method: 'post' 
                });
            const response = await call.json();

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
                            usuarioOid: movimentacaoResposta.UsuarioOid,
                        };

                        movimentacoes = [...movimentacoes, movimentacaoDeMaterial];
                    }
                }

                const fornecedor = {
                    oid: objetoResponse.Fornecedor.Oid,
                    tipo: objetoResponse.Fornecedor.Tipo,
                    nome: objetoResponse.Fornecedor.Nome,
                    tipo: objetoResponse.Fornecedor.Tipo,
                    cpfCnpj: objetoResponse.Fornecedor.CpfCnpj,
                    telefone: objetoResponse.Fornecedor.Telefone,
                    endereco: objetoResponse.Fornecedor.Endereco,
                };

                const material = {
                    oid: objetoResponse.Oid,
                    nome: objetoResponse.Nome,
                    detalhes: objetoResponse.Detalhes,
                    precoBase: objetoResponse.PrecoBase,
                    fornecedor: fornecedor,
                    estoque: objetoResponse.Estoque,
                    minimoEmEstoque: objetoResponse.MinimoEmEstoque,
                    mediaDeDiasDeUmaUnidade: objetoResponse.MediaDeDiasDeUmaUnidade,
                    proximaCompra: objetoResponse.ProximaCompra,
                    ultimaMovimentacao: objetoResponse.UltimaMovimentacao,
                    ativo: objetoResponse.Ativo,
                    alertaAmarelo: objetoResponse.AlertaAmarelo,
                    alertaVermelho: objetoResponse.AlertaVermelho,
                    movimentacoes: movimentacoes,
                };

                this.setState({material, movimentacoes});
            }

            this.setState({modalVisible: false});
        }catch (erro){
            this.setState({modalVisible: false});
            alert('Erro buscando material: ' + erro);
        }
    };

    openModal = () => {
        this.setState({confirmacaoModalVisible: true});
    };

    closeModal = () => {
        this.setState({confirmacaoModalVisible: false});
    };

    acao = (quantidade, modo) => {
        this.setState({confirmacaoModalVisible: false});
        this.props.navigation.goBack();
        this.props.route.params.acao(quantidade, modo);
    };

    openVideoInformativo = () => {
        Linking.openURL("http://sualavanderia.com.br/videos/MaterialDetails.mp4");
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.infoTitle}>Material</Text>
                    <View style={styles.viewBotao}>
                        <TouchableOpacity onPress={this.openVideoInformativo} style={styles.button}>
                            <Image style={styles.icon} source={require('../../images/pergunta_32x32.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <TouchableOpacity onPress={() => this.openModal()}>
                        <Material material={this.state.material} />
                    </TouchableOpacity>

                    <View style={styles.roupasContainer}>
                        <Text style={styles.roupasTitle}>Movimentações</Text>
                    </View>
                    
                    { this.state.movimentacoes.map(movimentacao => 
                        <MovimentacaoDeMaterial key={movimentacao.oid} objeto={movimentacao} />
                    )}
                </ScrollView>

                <LoadingModal modalVisible={this.state.modalVisible} />
                <ConfirmacaoModalMaterial visible={this.state.confirmacaoModalVisible} 
                    texto="Remover quantos?" onSim={this.acao} onNao={this.closeModal} />
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