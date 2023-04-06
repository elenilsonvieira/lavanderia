import React from 'react';
import {StyleSheet, View, ScrollView, Image, TextInput, TouchableOpacity, Linking } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DadosDePassagem from "../components/DadosDePassagem";
import fetch from '../utils/FetchWithTimeout';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Text from '../components/Text';

export default class MetaDePassagemScreen extends React.Component {

    state ={
        dataInicial: '',
        dataFinal: '',
        objeto: {
            dados: []
        },
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

        var dataInicial = this.state.dataInicial;
        var dataFinal = this.state.dataFinal;

        if(dataInicial == ''){
            var mes = hoje.getMonth() + 1;
            if(mes < 10){
                mes = '0' + mes;
            }

            var dia = hoje.getDate();
            if(dia < 10){
                dia = '0' + dia;
            }

            dataInicial = dia + '/' + mes + '/' + hoje.getFullYear();

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

        var argumentos = `dataInicial=${dataInicialParameter}&dataFinal=${dataFinalParameter}`;

        try{
            const call = await fetch(`http://painel.sualavanderia.com.br/api/BuscarMetaDePassagem.aspx?${argumentos}&login=${email}&senha=${hash}`, 
                { 
                    method: 'post' 
                });
            const response = await call.json();

            for(index in response){
                const objetoResponse = response[index];
                var dados = [];

                for(let dadoResponse of objetoResponse.Dados){

                    var operacoes = [];
                    for(let operacoesResponse of dadoResponse.Operacoes){
                        const operacaoDePassagem = {
                            cliente: operacoesResponse.Cliente,
                            totalDePecas: operacoesResponse.TotalDePecas,
                            totalDePeso: operacoesResponse.TotalDePeso,
                            data: operacoesResponse.Data,
                            dataParaEntrega: operacoesResponse.DataParaEntrega,
                        }

                        operacoes = [...operacoes, operacaoDePassagem];
                    }

                    const dadoDePassagem = {
                        funcionario: dadoResponse.Funcionario,
                        totalDePecas: dadoResponse.TotalDePecas,
                        totalDePeso: dadoResponse.TotalDePeso,
                        operacoes: operacoes,
                    };

                    dados = [...dados, dadoDePassagem];
                }

                const objeto = {
                    totalDePecas: objetoResponse.TotalDePecas,
                    totalDePecasPassado: objetoResponse.TotalDePecasPassado,
                    totalDePeso: objetoResponse.TotalDePeso,
                    totalDePesoPassado: objetoResponse.TotalDePesoPassado,
                    dados: dados,
                };    

                this.setState({objeto});
            }
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

    openVideoInformativo = () => {
        //Linking.openURL("http://sualavanderia.com.br/videos/OperacaoLavarScreen.mp4");
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <View style={styles.viewHeader}>
                            <Text style={styles.infoTitle}>Início: </Text>
                            <TouchableOpacity onPress={() => this.setState({dataInicialPickerVisible: true})}>
                                <Text style={styles.boxDate}>{this.state.dataInicial}</Text>
                            </TouchableOpacity>
                            <DateTimePickerModal 
                                mode="date"
                                isVisible={this.state.dataInicialPickerVisible}
                                onConfirm={this.dataInicialEscolhida}
                                onCancel={() => this.setState({dataInicialPickerVisible: false})}
                            />

                            <Text style={styles.infoTitle}>Fim: </Text>
                            <TouchableOpacity onPress={() => this.setState({dataFinalPickerVisible: true})}>
                                <Text style={styles.boxDate}>{this.state.dataFinal}</Text>
                            </TouchableOpacity>
                            <DateTimePickerModal 
                                mode="date"
                                isVisible={this.state.dataFinalPickerVisible}
                                onConfirm={this.dataFinalEscolhida}
                                onCancel={() => this.setState({dataFinalPickerVisible: false})}
                            />

                            <TouchableOpacity onPress={this.buscar} style={styles.button}>
                                <Image style={styles.icon} source={require('../images/pesquisar_32x32.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.objetoList}>
                    <View style={styles.containerInfo}>
                        <View style={styles.unidadeContainer}>
                            <View style={styles.lavagemInfoContainer}>
                                <Text style={styles.lavagemInfoTitle}>Peças/Peso: </Text>
                                <Text style={styles.lavagemInfo}>{this.state.objeto.totalDePecas} ({this.state.objeto.totalDePeso})</Text>
                            </View>

                            <View style={styles.lavagemInfoContainer}>
                                <Text style={styles.lavagemInfoTitle}>Peças/Peso Passados: </Text>
                                <Text style={styles.lavagemInfo}>{this.state.objeto.totalDePecasPassado} ({this.state.objeto.totalDePesoPassado})</Text>
                            </View>
                        </View>
                    </View>

                    {  
                    this.state.objeto.dados.map(objeto => 
                        <DadosDePassagem key={objeto.funcionario} objeto={objeto} />
                    )}
                </ScrollView>
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
          },
          header:{
            alignItems: 'center',
            justifyContent: 'space-between',
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
            margin: 5,
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
        containerInfo: {
            flex: 1,
            backgroundColor: '#333',
        },
        unidadeContainer: {
            borderRadius: 5,
            backgroundColor: '#FFF',
            padding: 5,
            paddingLeft: 20,
            margin: 10,
            justifyContent: 'center',
        },
        lavagemInfoContainer: {
            flexDirection: 'row',
        },
        lavagemInfoTitle: {
            fontWeight: 'bold',
            fontSize: 16,
        },
    }
);