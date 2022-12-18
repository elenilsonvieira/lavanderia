import React from 'react';
import {StyleSheet, View, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import Equipamento from "../components/Equipamento";
import LoadingModal from '../components/modals/LoadingModal';
import fetch from '../utils/FetchWithTimeout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Text from '../components/Text';

export default class EquipamentoScreen extends React.Component {

    state = {
        objetos: []
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

        var usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));//this.getUser();
        var hash = this.hash(usuario);
        var email = usuario.email;

        var argumentos = `ativo=true`;

        try{
            const call = await fetch(`http://painel.sualavanderia.com.br/api/BuscarEquipamento.aspx?${argumentos}&login=${email}&senha=${hash}`, 
            { 
                method: 'post' 
            });
            const response = await call.json();
            var objetos = [];

            for(index in response){
                const objetoResponse = response[index];
                var manutencoes = [];

                for(var i = 0; i < objetoResponse.Manutencoes.length; i++){
                    const movimentacaoEmCaixaResponse = objetoResponse.Manutencoes[i];

                    const manutencao = {
                        oid: movimentacaoEmCaixaResponse.Oid,
                        data: movimentacaoEmCaixaResponse.Data,
                        prestadorDoServico: movimentacaoEmCaixaResponse.PrestadorDoServico,
                        valor: movimentacaoEmCaixaResponse.Valor,
                        defeito: movimentacaoEmCaixaResponse.Defeito,
                        observacoes: movimentacaoEmCaixaResponse.Observacoes,
                    };

                    manutencoes = [...manutencoes, manutencao];
                }

                const objeto = {
                    oid: objetoResponse.Oid,
                    tombamento: objetoResponse.Tombamento,
                    tipo: objetoResponse.Tipo,
                    fabricante: objetoResponse.Fabricante,
                    compra: objetoResponse.Compra,
                    fimDeUso: objetoResponse.FimDeUso,
                    garantia: objetoResponse.Garantia,
                    fornecedor: objetoResponse.Fornecedor,
                    valor: objetoResponse.Valor,
                    observacoes: objetoResponse.Observacoes,
                    ativo: objetoResponse.Ativo,
                    garantivaAtiva: objetoResponse.GarantivaAtiva,
                    manutencoes: manutencoes,
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

    openVideoInformativo = () => {
        //Linking.openURL("http://sualavanderia.com.br/videos/CaixaScreen.mp4");
    };

    render(){
        return(
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.objetoList}>
                    {this.state.objetos.map(objeto => 
                        <TouchableOpacity key={objeto.oid} onPress={() => this.props.navigation.navigate('EquipamentoDetails', {objeto: objeto})}>
                            <Equipamento key={objeto.oid} objeto={objeto} />
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
            justifyContent: 'space-between',
            height: 80,
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
        picker:{
            height: 40,
            width: 150,
            borderRadius: 15,
            padding: 5,
        },
        buttonText: {
            fontWeight: 'bold',
        },
        button:{
            margin: 10,
        },
        icon: {
            width: 24,
            height: 24,
        },
        infoTitle: {
            fontWeight: 'bold',
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
    }
);