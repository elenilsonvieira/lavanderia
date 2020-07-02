import React from 'react';
import {TouchableOpacity, Image, StyleSheet, View, ScrollView, Text, AsyncStorage, Linking } from 'react-native';
import RoupaEmLavagemOperacoes from '../../components/RoupaEmLavagemOperacoes';
import ConfirmacaoModal from '../../components/modals/ConfirmacaoModal';
import LoadingModal from '../../components/modals/LoadingModal';
import fetch from '../../utils/FetchWithTimeout';

export default class LavagemDetailsOperacoes extends React.Component {

    state ={
        nome: '',
        modalVisible: false,
        confirmacaoModalVisible: false,
    };

    async componentWillMount(){
        const lavagem = this.props.navigation.getParam('lavagem');
        this.setState({lavagem});
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

    openModal = () => {
        this.setState({confirmacaoModalVisible: true});
    };
    
    closeModal = () => {
        this.setState({confirmacaoModalVisible: false});
    };

    acao = () => {
        this.setState({confirmacaoModalVisible: false});
        this.props.navigation.getParam("acao")();
    };

    openVideoInformativo = () => {
        Linking.openURL("http://sualavanderia.com.br/videos/LavagemDetailsOperacoes.mp4");
    };

    render(){
        const lavagem = this.state.lavagem;

        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.infoTitle}>Lavagem</Text>
                </View>
                <ScrollView>
                    <TouchableOpacity onPress={() => this.openModal()}>
                        <View style={styles.unidadeContainer}>
                            <View style={styles.lavagemInfoContainerCliente}>
                                <Text style={styles.lavagemInfoCliente}>{lavagem.cliente} ({lavagem.codigoDoCliente})</Text>
                            </View>

                            <View style={styles.lavagemInfoContainer}>
                                <Text style={styles.lavagemInfoTitle}>Quantidade de Peças: </Text>
                                <Text style={styles.lavagemInfo}>{lavagem.quantidadeDePecas}</Text>
                            </View>

                            <View style={styles.lavagemInfoContainer}>
                                <Text style={styles.lavagemInfoTitle}>Unidade: </Text>
                                <Text style={styles.lavagemInfo}>{lavagem.unidadeDeRecebimento}</Text>
                            </View>

                            <View style={styles.lavagemInfoContainer}>
                                <Text style={styles.lavagemInfoTitle}>Data de Recebimento: </Text>
                                <Text style={styles.lavagemInfo}>{lavagem.dataDeRecebimento}</Text>
                            </View>

                            <View style={styles.lavagemInfoContainer}>
                                <Text style={styles.lavagemInfoTitle}>Data para Entrega: </Text>
                                <Text style={styles.lavagemInfo}>{lavagem.dataPreferivelParaEntrega}</Text>
                            </View>

                            <View style={styles.lavagemInfoContainer}>
                                <Text style={styles.lavagemInfoTitle}>Hora para Entrega: </Text>
                                <Text style={styles.lavagemInfo}>{lavagem.horaPreferivelParaEntrega}</Text>
                            </View>

                            <View style={styles.lavagemInfoContainer}>
                                <Text style={styles.lavagemInfoTitle}>Status: </Text>
                                <Text style={styles.lavagemInfo}>{lavagem.status}</Text>
                            </View>

                            <View style={styles.lavagemInfoContainer}>
                                <Text style={styles.lavagemInfoTitle}>Recolhida do Varal? </Text>
                                <Text style={styles.lavagemInfo}>{lavagem.recolhidaDoVaralString}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.roupasContainer}>
                        <Text style={styles.roupasTitle}>Roupas</Text>
                    </View>
                    
                    { lavagem.roupas.map(roupaEmLavagem => 
                        <RoupaEmLavagemOperacoes key={roupaEmLavagem.roupa.oid} roupaEmLavagem={roupaEmLavagem} />
                    )}
                </ScrollView>

                <ConfirmacaoModal visible={this.state.confirmacaoModalVisible} texto={this.props.navigation.getParam("texto")} 
                    onSim={() => this.acao()} onNao={() => this.closeModal()} />

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
            height: 40,
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