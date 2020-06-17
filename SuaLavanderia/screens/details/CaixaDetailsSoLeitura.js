import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Linking, Image } from 'react-native';

import Caixa from '../../components/Caixa';
import MovimentacaoDeCaixa from '../../components/MovimentacaoDeCaixa';
import LoadingModal from '../../components/modals/LoadingModal';

export default class CaixaDetailsSoleitura extends React.Component {

    state ={
        oid: '',
        conta: '',
        saldoInicial: '0',
        saldoAtual: '0',
        fechado: false,
        data: '',
        dataTimePickerVisible: false,
        modalVisible: false,
        objeto: null,
        movimentacoes: [],
    };

    componentDidMount(){
        const objeto = this.props.navigation.getParam('objeto');

        if(objeto != null){
            const oid = objeto.oid;
            const saldoInicial = objeto.saldoInicial.toString();
            const saldoAtual = objeto.saldoAtual.toString();
            const conta = objeto.conta;
            const fechado = objeto.fechado;
            const data = objeto.data;
            const movimentacoes = objeto.movimentacoes;

            this.setState({oid, saldoInicial, saldoAtual, conta, fechado, data, objeto, movimentacoes});
        }
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

    async buscar() {
        var usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));//this.getUser();
        var hash = this.hash(usuario);
        var email = usuario.email;

        var argumentos = `oid=${this.state.oid}`;

        this.setState({modalVisible: true});

        try{
            const call = await fetch(`http://painel.sualavanderia.com.br/api/BuscarCaixa.aspx?${argumentos}&login=${email}&senha=${hash}`, 
            { 
                method: 'post' 
            });
            const response = await call.json();

            var objetos = [];

            for(index in response){
                const objetoResponse = response[index];
                var movimentacoes = [];

                for(indexMovimentacao in objetoResponse.Movimentacoes){
                    const movimentacaoEmCaixaResponse = objetoResponse.Movimentacoes[indexMovimentacao];

                    const movimentacaoEmCaixa = {
                        oid: movimentacaoEmCaixaResponse.Oid,
                        dataDaUltimaAlteracao: movimentacaoEmCaixaResponse.DataDaUltimaAlteracao,
                        data: movimentacaoEmCaixaResponse.Data,
                        modo: movimentacaoEmCaixaResponse.Modo,
                        capital: movimentacaoEmCaixaResponse.Capital,
                        tipo: movimentacaoEmCaixaResponse.Tipo,
                        valor: movimentacaoEmCaixaResponse.Valor,
                        observacoes: movimentacaoEmCaixaResponse.Observacoes,
                        status: movimentacaoEmCaixaResponse.Status,
                        responsavel: movimentacaoEmCaixaResponse.Responsavel,
                        responsavelOid: movimentacaoEmCaixaResponse.ResponsavelOid,
                        conferidor: movimentacaoEmCaixaResponse.Conferidor,
                        lavagem: movimentacaoEmCaixaResponse.Lavagem,
                        contaDeEntrada: movimentacaoEmCaixaResponse.ContaDeEntrada,
                        contaDeSaida: movimentacaoEmCaixaResponse.ContaDeSaida,
                    };

                    movimentacoes = [...movimentacoes, movimentacaoEmCaixa];
                }

                const objeto = {
                    oid: objetoResponse.Oid,
                    data: objetoResponse.Data,
                    conta: objetoResponse.Conta,
                    saldoInicial: objetoResponse.SaldoInicial,
                    saldoAtual: objetoResponse.SaldoAtual,
                    movimentacoes: movimentacoes,
                };    

                objetos = [...objetos, objeto];
            }

            if(objetos.length > 0){
                const objeto = objetos[0];

                const oid = objeto.oid;
                const saldoInicial = objeto.saldoInicial.toString();
                const saldoAtual = objeto.saldoAtual.toString();
                const conta = objeto.conta;
                const fechado = objeto.fechado;
                const data = objeto.data;
                const movimentacoes = objeto.movimentacoes;

                this.setState({oid, saldoInicial, saldoAtual, conta, fechado, data, objeto, movimentacoes});
            }else{
                alert('Erro fazendo o reload do objeto.');    
            }
        }catch(erro){
            alert('Erro.' + erro);
        }

        this.setState({modalVisible: false});
    };

    navegarParaDetalhes(props, movimentacaoEmCaixa){
        props.navigation.navigate('MovimentacaoDeCaixaDetails', {movimentacao: movimentacaoEmCaixa, reload: this.buscar.bind(this)});
    }

    openVideoInformativo = () => {
        Linking.openURL("http://sualavanderia.com.br/videos/CaixaDetails.mp4");
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.infoTitle}>Caixa</Text>
                    <View style={styles.viewBotao}>
                        <TouchableOpacity onPress={this.openVideoInformativo} style={styles.button}>
                            <Image style={styles.icon} source={require('../../images/pergunta_32x32.png')} />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView>
                    <Caixa objeto={this.state.objeto ? this.state.objeto : this.props.navigation.getParam('objeto')} />

                    <View style={styles.roupasContainer}>
                        <Text style={styles.roupasTitle}>Movimentações</Text>
                    </View>
                    
                    { 
                        this.state.movimentacoes.map(movimentacaoEmCaixa => 
                        <TouchableOpacity key={movimentacaoEmCaixa.oid} onPress={() => this.navegarParaDetalhes(this.props, movimentacaoEmCaixa)}>
                            <MovimentacaoDeCaixa movimentacao={movimentacaoEmCaixa} />
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