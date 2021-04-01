import React from 'react';
import {StyleSheet, View, Picker, Image, Text, TextInput, TouchableOpacity, AsyncStorage, Linking } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import fetch from '../../utils/FetchWithTimeout';
import LoadingModal from '../../components/modals/LoadingModal';

export default class BuscaDetails extends React.Component {

    state ={
        observacoes: '',
        data: '',
        hora: '09:00',
        nomeDoCliente: '',
        cliente: null,
        dataTimePickerVisible: false,
        modalVisible: false,
    };

    componentDidMount(){
        this.dataEscolhida(new Date());
    }

    async salvar(props) {
        if(!this.state.cliente){
            alert('Selecione um cliente');
            return;
        }

        var parteHora = this.state.hora.split(':')[0];
        var parteMinutos = this.state.hora.split(':')[1];

        if(parteHora == "" || isNaN(parteHora) || parseInt(parteHora)>23
            || parteMinutos == "" || isNaN(parteMinutos) || parseInt(parteMinutos)>59)
        {
            alert("Hora inválida");
            return;
        }

        this.setState({modalVisible: true});

        var usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));//this.getUser();
        var hash = this.hash(usuario);
        var email = usuario.email;

        var dataArray = this.state.data.split('/');
        const data = dataArray[2] + '-'+ dataArray[1] + '-' + dataArray[0];

        var argumentos = 'data=' + data + '&clienteOid=' + this.state.cliente.oid + '&hora=' + this.state.hora + '&observacoes=' + this.state.observacoes;

        const call = await fetch(`http://painel.sualavanderia.com.br/api/AdicionarSolicitacaoDeBusca.aspx?${argumentos}&login=${email}&senha=${hash}`, 
            { 
                method: 'post' 
            }).then(function(response){
                alert('Adicionado com sucesso!');
                props.navigation.state.params.reload();
                props.navigation.goBack();
            }
            ).catch(function(error){
                alert('Erro adicionando busca.' + error);    
            });        

        this.setState({modalVisible: false});
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
                        <Text style={styles.boxInput}>{this.state.nomeDoCliente}</Text>
                    </TouchableOpacity>

                    <Text style={styles.infoTitle}>Observações: </Text>
                    <TextInput
                        style={styles.boxInput}
                        value={this.state.observacoes}
                        onChangeText={observacoes => this.setState({observacoes})}
                    />
                </View>

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