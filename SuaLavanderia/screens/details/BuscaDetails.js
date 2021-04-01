import React from 'react';
import {StyleSheet, View, Picker, Image, Text, TextInput, TouchableOpacity, AsyncStorage, Linking } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import fetch from '../../utils/FetchWithTimeout';

export default class BuscaDetails extends React.Component {

    state ={
        observacoes: '',
        data: '',
        hora: '09:00',
        nomeDoCliente: '',
        cliente: {},
        dataTimePickerVisible: false,
    };

    async salvar(props) {
        var usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));//this.getUser();
        var hash = this.hash(usuario);
        var email = usuario.email;

        const movimentacao = this.props.navigation.getParam('movimentacao');
        const lavagem = this.props.navigation.getParam('lavagem');

        const responsavelOid = movimentacao != null ? movimentacao.responsavelOid : email;

        var capital = '0';

        switch(this.state.capital){
            case 'Dinheiro': capital = 0; break;
            case 'Cheque': capital = 3; break;
            case 'Boleto': capital = 4; break;
            case 'PagSeguroDebito': capital = 6; break;
            case 'PagSeguroCredito': capital = 7; break;
            case 'TransferenciaBB': capital = 8; break;
            case 'TransferenciaCaixa': capital = 9; break;
            case 'PicPay': capital = 10; break;
            default: ;
        }

        var dataArray = this.state.data.split('/');
        const data = dataArray[2] + '-'+ dataArray[1] + '-' + dataArray[0];

        var argumentos = 'data=' + data + '&capital=' + capital + '&valor=' + this.state.valor + '&observacoes=' + this.state.observacoes + '&responsavelOid=' + responsavelOid + '&modo=' + this.state.modo + '&contaDeEntrada=' + this.state.contaDeEntrada + '&contaDeSaida=' + this.state.contaDeSaida;

        if(movimentacao != null){
            argumentos += '&oid=' + movimentacao.oid;
        }

        if(lavagem != null){
            argumentos += '&lavagemOid=' + lavagem.oid;
        }

        const call = await fetch(`http://painel.sualavanderia.com.br/api/AdicionarMovimentacaoDeCaixa.aspx?${argumentos}&login=${email}&senha=${hash}`, 
            { 
                method: 'post' 
            }).then(function(response){
                alert(movimentacao == null ? 'Adicionado com sucesso!' : 'Alterado com sucesso!');

                if(lavagem != null){
                    props.navigation.state.params.reload();
                }

                props.navigation.goBack();
            }
            ).catch(function(error){
                alert('Erro adicionando a movimentação de caixa.' + error);    
            });        
    }

    dataEscolhida = (dataEscolhida) => {
        var dia = dataEscolhida.getDate();
        var mes = dataEscolhida.getMonth() + 1;

        if(dia < 10){
            dia = '0' + dia;
        }

        if(mes < 10){
            mes = '0' + mes;
        }

        this.setState({ 
            dataTimePickerVisible: false,
            data: dia + '/' + mes + '/' + dataEscolhida.getFullYear(),
        });
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

    openVideoInformativo = () => {
        Linking.openURL("http://sualavanderia.com.br/videos/MovimentacaoDeCaixaDetails.mp4");
    };

    clienteEscolhido = (cliente) => {
        if(cliente){
            this.setState({cliente, nomeDoCliente: cliente.nome});
        }
    }

    navegarParaBuscarCliente = () => {
        this.props.navigation.navigate('SelecionarUsuarioDetails', {acao: this.clienteEscolhido.bind(this)});
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.infoTitle}>Busca</Text>

                    <TouchableOpacity onPress={() => this.salvar(this.props)} style={styles.button}>
                        <Image style={styles.icon} source={require('../../images/salvar_32x32.png')} />
                    </TouchableOpacity>
                </View>

                <View style={styles.movimentacaoContainer}>
                    <Text style={styles.infoTitle}>Data: </Text>
                    <TouchableOpacity onPress={() => this.setState({dataTimePickerVisible: true})}>
                        <Text style={styles.boxDate}>{this.state.data}</Text>
                    </TouchableOpacity>
                    <DateTimePicker 
                        isVisible={this.state.dataTimePickerVisible}
                        onConfirm={this.dataEscolhida}
                        onCancel={() => this.setState({dataTimePickerVisible: false})}
                    />

                    <Text style={styles.infoTitle}>Hora: </Text>
                    <TextInput
                        style={styles.boxInput}
                        value={this.state.hora}
                        onChangeText={hora => this.setState({hora})}
                    />

                    <Text style={styles.infoTitle}>Cliente: </Text>
                    <TouchableOpacity onPress={this.navegarParaBuscarCliente}>
                        <TextInput
                            style={styles.boxInput}
                            value={this.state.nomeDoCliente}
                            onChangeText={nomeDoCliente => this.setState({nomeDoCliente})}
                        />
                    </TouchableOpacity>

                    <Text style={styles.infoTitle}>Observações: </Text>
                    <TextInput
                        style={styles.boxInput}
                        value={this.state.observacoes}
                        onChangeText={observacoes => this.setState({observacoes})}
                    />
                </View>
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
            justifyContent: 'flex-end',
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
    }
);