import React from 'react';
import {StyleSheet, View, Picker, Image, Text, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class MovimentacaoDeCaixaDetails extends React.Component {

    state ={
        oid: '',
        tipo: '',
        tecido: '',
        tamanho: '',
        marca: '',
        observacao: '',
        codigo: '',
        cliente: '',
        clienteOid: '',
        chave: '',
        cores: '',
        tiposArray: [], 
        tecidosArray: [], 
        tamanhosArray: [], 
        marcasArray: [], 
        coresArray: [],
    };

    async componentDidMount(){
        var usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));//this.getUser();
        var hash = this.hash(usuario);
        var email = usuario.email;

        const roupa = this.props.navigation.getParam('roupa');

        if(roupa != null){
            const oid = roupa.oid;
            const tipo = roupa.tipo;
            const tecido = roupa.tecido;
            const tamanho = roupa.tamanho;
            const marca = roupa.marca;
            const observacao = roupa.observacao;
            const codigo = roupa.codigo;
            const chave = roupa.chave;
            const cliente = roupa.cliente;
            const clienteOid = roupa.clienteOid;
            const cores = roupa.cores;

            this.setState({roupa, oid, tipo, tecido, tamanho, marca, observacao, codigo, chave, cliente, clienteOid, cores});
        }

        var tiposArray = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:tipos")) || [];
        var tecidosArray = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:tecidos")) || [];
        var tamanhosArray = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:tamanhos")) || [];
        var marcasArray = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:marcas")) || [];
        var coresArray = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:cores")) || [];

        this.setState({tiposArray, tecidosArray, tamanhosArray, marcasArray, coresArray});
    }

    async salvar(props) {
        var usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));//this.getUser();
        var hash = this.hash(usuario);
        var email = usuario.email;

        const movimentacao = this.props.navigation.getParam('movimentacao');
        const responsavelOid = movimentacao != null ? movimentacao.responsavelOid : 'elenilsonvieira@gmail.com';

        var capital = '0';

        switch(this.state.capital){
            case 'Dinheiro': capital = 0; break;
            case 'Cheque': capital = 3; break;
            case 'Boleto': capital = 4; break;
            case 'PagSeguroDebito': capital = 6; break;
            case 'PagSeguroCredito': capital = 7; break;
            case 'TransferenciaBB': capital = 8; break;
            case 'TransferenciaCaixa': capital = 9; break;
            default: ;
        }

        var dataArray = this.state.data.split('/');
        const data = dataArray[2] + '-'+ dataArray[1] + '-' + dataArray[0];

        var argumentos = 'data=' + data + '&capital=' + capital + '&valor=' + this.state.valor + '&observacoes=' + this.state.observacoes + '&responsavelOid=' + responsavelOid + '&modo=' + this.state.modo;

        if(movimentacao != null){
            argumentos += '&oid=' + movimentacao.oid;
        }

        const call = await fetch(`http://painel.sualavanderia.com.br/api/AdicionarMovimentacaoDeCaixa.aspx?${argumentos}&login=${email}&senha=${hash}`, 
            { 
                method: 'post' 
            }).then(function(response){
                alert(movimentacao == null ? 'Adicionado com sucesso!' : 'Alterado com sucesso!');
                props.navigation.goBack();
            }
            ).catch(function(error){
                alert('Erro adicionando a movimentação de caixa.' + error);    
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

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.salvar(this.props)} style={styles.button}>
                        <Image style={styles.icon} source={require('../../images/salvar_32x32.png')} />
                    </TouchableOpacity>
                </View>

                <View style={styles.objetoContainer}>
                    <Text style={styles.valorInfoTitle}>Oid: {this.state.oid}</Text>

                    <Text style={styles.infoTitle}>Tipo: </Text>
                    <Picker
                        style={styles.boxInput}
                        selectedValue={this.state.tipo}
                        onValueChange={(itemValue, itemIndex) => this.setState({tipo: itemValue})}>
                        <Picker.Item label='Dinheiro' value='Dinheiro' />
                        <Picker.Item label='Cheque' value='Cheque' />
                        <Picker.Item label='Boleto' value='Boleto' />
                        <Picker.Item label='PagSeguro Débito' value='PagSeguroDebito' />
                        <Picker.Item label='PagSeguro Crédito' value='PagSeguroCredito' />
                        <Picker.Item label='Transferência de/para BB' value='TransferenciaBB' />
                        <Picker.Item label='Transferência de/para Caixa' value='TransferenciaCaixa' />
                    </Picker>

                    <Text style={styles.infoTitle}>Tecido: </Text>
                    <Picker
                        style={styles.boxInput}
                        selectedValue={this.state.tecido}
                        onValueChange={(itemValue, itemIndex) => this.setState({tecido: itemValue})}>
                        {this.state.tecidosArray.map(objeto => 
                            <Picker.Item key={objeto.oid} label={objeto.nome} value={objeto.nome} />    
                        )}
                    </Picker>

                    <Text style={styles.infoTitle}>Código: </Text>
                    <TextInput
                        style={styles.boxInput}
                        value={this.state.codigo}
                        onChangeText={codigo => this.setState({codigo})}
                    />

                    <Text style={styles.infoTitle}>Observação: </Text>
                    <TextInput
                        style={styles.boxInput}
                        value={this.state.observacao}
                        onChangeText={observacao => this.setState({observacao})}
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
        objetoContainer: {
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