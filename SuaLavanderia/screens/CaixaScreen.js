import React from 'react';
import {StyleSheet, View, ScrollView, Image, Picker, Text, TouchableOpacity, AsyncStorage, Linking } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Caixa from "../components/Caixa";
import LoadingModal from '../components/modals/LoadingModal';

export default class CaixaScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Caixa',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../images/caixaFinanceiro_32x32.png')}
            style={styles.icon}
          />
        ),
      };

    state ={
        valor: '',
        objetos: [],
        dataInicialPickerVisible: false,
        dataFinalPickerVisible: false,
        dataInicial: '',
        dataFinal: '',
        modalVisible: false,
        conta: '',
    };

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

        const data = new Date();
        var dia = data.getDate();
        var mes = data.getMonth() + 1;

        if(dia < 10){
            dia = '0' + dia;
        }

        if(mes < 10){
            mes = '0' + mes;
        }

        var dataInicial = this.state.dataInicial != '' ? this.state.dataInicial : (dia + '/' + mes + '/' + data.getFullYear());
        var dataFinal = this.state.dataFinal != '' ? this.state.dataFinal : (dia + '/' + mes + '/' + data.getFullYear());

        var dataInicialArray = dataInicial.split('/');
        dataInicial = dataInicialArray[2] + '-'+ dataInicialArray[1] + '-' + dataInicialArray[0];

        var dataFinalArray = dataFinal.split('/');
        dataFinal = dataFinalArray[2] + '-'+ dataFinalArray[1] + '-' + dataFinalArray[0];

        var argumentos = `dataInicial=${dataInicial}&dataFinal=${dataFinal}`;

        if(this.state.conta != ''){
            argumentos += `&conta=${this.state.conta}`;
        }

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

            this.setState({objetos});
        }catch(erro){
            alert('Erro.' + erro);
        }

        this.setState({modalVisible: false});
    };

    filtrar =  () => {        
        if(this.state.valor.trim() !== '') {
            var objetos = [];

            this.state.objetos.map(objeto => {
                if(objeto.nome.toString().includes(this.state.valor)){ 
                    objetos = [...objetos, objeto];
                }
            });

            this.setState({objetos});
        }
    };

    async componentDidMount(){
        var hoje = new Date();
        var dia = hoje.getDate();
        var mes = hoje.getMonth() + 1;

        if(dia < 10){
            dia = '0' + dia;
        }

        if(mes < 10){
            mes = '0' + mes;
        }

        const dataInicial = dia + '/' + mes + '/' + hoje.getFullYear();
        const dataFinal = dia + '/' + mes + '/' + hoje.getFullYear();

        this.setState({dataInicial, dataFinal});

        //this.dataInicialEscolhida(new Date());
        //this.dataFinalEscolhida(new Date());

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
        //Linking.openURL("http://sualavanderia.com.br/videos/estoque.mp4");
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
                            <DateTimePicker 
                                isVisible={this.state.dataInicialPickerVisible}
                                onConfirm={this.dataInicialEscolhida}
                                onCancel={() => this.setState({dataInicialPickerVisible: false})}
                            />

                            <Text style={styles.infoTitle}>Fim: </Text>
                            <TouchableOpacity onPress={() => this.setState({dataFinalPickerVisible: true})}>
                                <Text style={styles.boxDate}>{this.state.dataFinal}</Text>
                            </TouchableOpacity>
                            <DateTimePicker 
                                isVisible={this.state.dataFinalPickerVisible}
                                onConfirm={this.dataFinalEscolhida}
                                onCancel={() => this.setState({dataFinalPickerVisible: false})}
                            />
                        </View>
                        <View style={styles.viewHeaderSegundaLinha}>
                            <View style={styles.viewHeader}>
                                <Text style={styles.infoTitle}>Conta: </Text>
                                <Picker
                                    style={styles.picker} 
                                    selectedValue={this.state.conta}
                                    onValueChange={(itemValue, itemIndex) => this.setState({conta: itemValue})} >
                                    <Picker.Item label='Geral' value='Geral' />
                                    <Picker.Item label='Manaíra' value='Manaíra' />
                                    <Picker.Item label='Bessa' value='Bessa' />
                                    <Picker.Item label='Tudo' value='' />
                                </Picker>
                            </View>

                            <View style={styles.viewHeader}>
                                <TouchableOpacity onPress={this.buscar} style={styles.button}>
                                    <Image style={styles.icon} source={require('../images/pesquisar_32x32.png')} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('CaixaDetails')} style={styles.button}>
                                    <Image style={styles.icon} source={require('../images/novo_32x32.png')} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={this.openVideoInformativo} style={styles.button}>
                                    <Image style={styles.icon} source={require('../images/pergunta_32x32.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.objetoList}>
                    {this.state.objetos.map(objeto => 
                        <TouchableOpacity key={objeto.oid} onPress={() => this.props.navigation.navigate('CaixaDetailsSoLeitura', {objeto: objeto})}>
                            <Caixa key={objeto.oid} objeto={objeto} />
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