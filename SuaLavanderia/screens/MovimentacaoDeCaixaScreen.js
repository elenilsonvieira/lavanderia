import React from 'react';
import {StyleSheet, View, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MovimentacaoDeCaixa from "../components/MovimentacaoDeCaixa";
import LoadingModal from '../components/modals/LoadingModal';
import fetch from '../utils/FetchWithTimeout';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Text from '../components/Text';

export default class MovimentacaoDeCaixaScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Movimentação de Caixa',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../images/pagamento_32x32.png')}
            style={styles.icon}
          />
        ),
      };

    state ={
        modo: '',
        valor: '',
        objetos: [],
        dataInicialPickerVisible: false,
        dataFinalPickerVisible: false,
        dataInicial: '',
        dataFinal: '',
        modalVisible: false,
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

        if(this.state.modo != ''){
            argumentos += `&modo=${this.state.modo}`;
        }

        // alert(`http://painel.sualavanderia.com.br/api/BuscarMovimentacaoDeCaixa.aspx?${argumentos}&login=${email}&senha=${hash}`);

        try{
            const call = await fetch(`http://painel.sualavanderia.com.br/api/BuscarMovimentacaoDeCaixa.aspx?${argumentos}&login=${email}&senha=${hash}`, 
            { 
                method: 'post' 
            });
            const response = await call.json();

            var objetos = [];

            for(index in response){
                const objetoResponse = response[index];

                const objeto = {
                    oid: objetoResponse.Oid,
                    dataDaUltimaAlteracao: objetoResponse.DataDaUltimaAlteracao,
                    data: objetoResponse.Data,
                    modo: objetoResponse.Modo,
                    capital: objetoResponse.Capital,
                    tipo: objetoResponse.Tipo,
                    valor: objetoResponse.Valor,
                    observacoes: objetoResponse.Observacoes,
                    status: objetoResponse.Status,
                    responsavel: objetoResponse.Responsavel,
                    responsavelOid: objetoResponse.ResponsavelOid,
                    conferidor: objetoResponse.Conferidor,
                    lavagem: objetoResponse.Lavagem,
                    contaDeEntrada: objetoResponse.ContaDeEntrada,
                    contaDeSaida: objetoResponse.ContaDeSaida,
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
                if(objeto.valor.toString().includes(this.state.valor)){ 
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
        Linking.openURL("http://sualavanderia.com.br/videos/MovimentacaoDeCaixaScreen.mp4");
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
                        </View>
                        <View style={styles.viewHeaderSegundaLinha}>
                            <View style={styles.viewHeader}>
                                <Text style={styles.infoTitle}>Modo: </Text>
                                <Picker
                                    style={styles.picker} 
                                    selectedValue={this.state.modo}
                                    onValueChange={(itemValue, itemIndex) => this.setState({modo: itemValue})} >
                                    <Picker.Item label='Saída' value='Saida' />
                                    <Picker.Item label='Entrada' value='Entrada' />
                                    <Picker.Item label='Transferência' value='Transferencia' />
                                    <Picker.Item label='Tudo' value='' />
                                </Picker>
                            </View>

                            <View style={styles.viewHeader}>
                                <TouchableOpacity onPress={this.buscar} style={styles.button}>
                                    <Image style={styles.icon} source={require('../images/pesquisar_32x32.png')} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('MovimentacaoDeCaixaDetails', {reload: this.buscar.bind(this)})} style={styles.button}>
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
                        <TouchableOpacity key={objeto.oid} onPress={() => this.props.navigation.navigate('MovimentacaoDeCaixaDetails', {movimentacao: objeto, reload: this.buscar.bind(this)})}>
                            <MovimentacaoDeCaixa key={objeto.oid} movimentacao={objeto} />
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