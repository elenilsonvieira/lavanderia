import React from 'react';
import {StyleSheet, View, Picker, Image, Text, TextInput, TouchableOpacity, AsyncStorage, Linking } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class MovimentacaoDeCaixaDetails extends React.Component {

    state ={
        oid: '',
        valor: '0',
        observacoes: '',
        capital: 'Dinheiro',
        data: '',
        modo: 'Saida',
        contaDeEntrada: '',
        contaDeSaida: '',
        dataTimePickerVisible: false,
    };

    componentDidMount(){
        const movimentacao = this.props.navigation.getParam('movimentacao');
        const lavagem = this.props.navigation.getParam('lavagem');

        if(movimentacao != null){
            const oid = movimentacao.oid;
            const valor = movimentacao.valor.toString();
            const observacoes = movimentacao.observacoes;
            const capital = movimentacao.capital;
            const data = movimentacao.data;
            const modo = movimentacao.modo;
            const contaDeEntrada = movimentacao.contaDeEntrada;
            const contaDeSaida = movimentacao.contaDeSaida;

            this.setState({oid, valor, observacoes, capital, data, modo, contaDeEntrada, contaDeSaida});
        }else{
            this.dataEscolhida(new Date());

            if(lavagem != null){
                const valor = lavagem.valor.toString();
                const modo = 'Entrada';

                this.setState({valor, modo});
            }
        }
    }

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

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.infoTitle}>Movimentação de Caixa</Text>

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

                    <Text style={styles.infoTitle}>Modo: </Text>
                    <Picker
                        style={styles.boxInput}
                        selectedValue={this.state.modo}
                        onValueChange={(itemValue, itemIndex) => this.setState({modo: itemValue})}>
                        <Picker.Item label='Saída' value='Saida' />
                        <Picker.Item label='Entrada' value='Entrada' />
                        <Picker.Item label='Transferência' value='Transferencia' />
                    </Picker>

                    <Text style={styles.infoTitle}>Valor: </Text>
                    <TextInput
                        style={styles.boxInput}
                        value={this.state.valor}
                        keyboardType='numeric'
                        onChangeText={valor => this.setState({valor})}
                    />

                    <Text style={styles.infoTitle}>Capital: </Text>
                    <Picker
                        style={styles.boxInput}
                        selectedValue={this.state.capital}
                        onValueChange={(itemValue, itemIndex) => this.setState({capital: itemValue})}>
                        <Picker.Item label='Dinheiro' value='Dinheiro' />
                        <Picker.Item label='Cheque' value='Cheque' />
                        <Picker.Item label='Boleto' value='Boleto' />
                        <Picker.Item label='PagSeguro Débito' value='PagSeguroDebito' />
                        <Picker.Item label='PagSeguro Crédito' value='PagSeguroCredito' />
                        <Picker.Item label='Transferência de/para BB' value='TransferenciaBB' />
                        <Picker.Item label='Transferência de/para Caixa' value='TransferenciaCaixa' />
                        <Picker.Item label='Pic Pay' value='PicPay' />
                    </Picker>

                    <Text style={styles.infoTitle}>Conta de Entrada: </Text>
                    <Picker
                        style={styles.boxInput}
                        selectedValue={this.state.contaDeEntrada}
                        onValueChange={(itemValue, itemIndex) => this.setState({contaDeEntrada: itemValue})}>
                        <Picker.Item label='' value='' />
                        <Picker.Item label='Geral' value='Geral' />
                        <Picker.Item label='Manaíra' value='Manaíra' />
                        <Picker.Item label='Bessa' value='Bessa' />
                    </Picker>

                    <Text style={styles.infoTitle}>Conta de Saída: </Text>
                    <Picker
                        style={styles.boxInput}
                        selectedValue={this.state.contaDeSaida}
                        onValueChange={(itemValue, itemIndex) => this.setState({contaDeSaida: itemValue})}>
                        <Picker.Item label='' value='' />
                        <Picker.Item label='Geral' value='Geral' />
                        <Picker.Item label='Manaíra' value='Manaíra' />
                        <Picker.Item label='Bessa' value='Bessa' />
                    </Picker>

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