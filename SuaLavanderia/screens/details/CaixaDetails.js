import React from 'react';
import {StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Linking } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Picker} from '@react-native-picker/picker';
import fetch from '../../utils/FetchWithTimeout';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class CaixaDetails extends React.Component {

    state ={
        oid: '',
        conta: 'Geral',
        saldoInicial: '0',
        saldoAtual: '0',
        fechado: false,
        data: '',
        dataTimePickerVisible: false,
        novo: false,
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

            this.setState({oid, saldoInicial, saldoAtual, conta, fechado, data});
        }else{
            this.dataEscolhida(new Date());
            this.setState({novo: true});
        }
    }

    async salvar(props) {
        var usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));//this.getUser();
        var hash = this.hash(usuario);
        var email = usuario.email;

        const objeto = this.props.navigation.getParam('objeto');

        var dataArray = this.state.data.split('/');
        const data = dataArray[2] + '-'+ dataArray[1] + '-' + dataArray[0];

        var argumentos = 'data=' + data + '&conta=' + this.state.conta;

        if(objeto != null){
            argumentos += '&oid=' + objeto.oid;
        }

        const call = await fetch(`http://painel.sualavanderia.com.br/api/AdicionarCaixa.aspx?${argumentos}&login=${email}&senha=${hash}`, 
            { 
                method: 'post' 
            }).then(function(response){
                alert(objeto == null ? 'Adicionado com sucesso!' : 'Alterado com sucesso!');

                props.navigation.goBack();
            }
            ).catch(function(error){
                alert('Erro adicionando o caixa.' + error);    
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
        Linking.openURL("http://sualavanderia.com.br/videos/CaixaDetails.mp4");
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.infoTitle}>Caixa</Text>

                    <TouchableOpacity onPress={() => this.salvar(this.props)} style={styles.button}>
                        <Image style={styles.icon} source={require('../../images/salvar_32x32.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.openVideoInformativo} style={styles.button}>
                        <Image style={styles.icon} source={require('../../images/pergunta_32x32.png')} />
                    </TouchableOpacity>
                </View>

                <View style={styles.movimentacaoContainer}>
                    <Text style={styles.infoTitle}>Data: </Text>
                    <TouchableOpacity onPress={() => this.setState({dataTimePickerVisible: true})}>
                        <Text style={styles.boxDate}>{this.state.data}</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal 
                        mode="date"
                        isVisible={this.state.dataTimePickerVisible}
                        onConfirm={this.dataEscolhida}
                        onCancel={() => this.setState({dataTimePickerVisible: false})}
                    />

                    <Text style={styles.infoTitle}>Conta: </Text>
                    <Picker
                        style={styles.boxInput}
                        selectedValue={this.state.conta}
                        onValueChange={(itemValue, itemIndex) => this.setState({conta: itemValue})}>
                        <Picker.Item label='Geral' value='Geral' />
                        <Picker.Item label='Bessa' value='Bessa' />
                        <Picker.Item label='Manaíra' value='Manaíra' />
                    </Picker>
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