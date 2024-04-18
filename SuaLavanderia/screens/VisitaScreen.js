import React from 'react';
import {StyleSheet, View, ScrollView, Image, TextInput, TouchableOpacity, Linking } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Visita from "../components/Visita";
import LoadingModal from '../components/modals/LoadingModal';
import fetch from '../utils/FetchWithTimeout';
import ConfirmacaoModalVisita from '../components/modals/ConfirmacaoModalVisita';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Text from '../components/Text';

export default class VisitaScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Visita',
        drawerIcon: ({ tintColor }) => (
            <Image
            source={require('../images/Visita_64x64.png')}
            style={styles.icon}
            />
        ),
    };

    state ={
        objetos: [],
        dataInicial: '',
        dataFinal: '',
        comentario: '',
        objeto: {},
        modalVisible: false,
        confirmacaoModalVisible: false,
        listaDeComprasModalVisible: false,
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
        var diasAtras = new Date(new Date().getTime() - 1 * 24*60*60*1000);
        var diasAFrente = new Date(new Date().getTime() + 3 * 24*60*60*1000);

        var dataInicial = this.state.dataInicial;
        var dataFinal = this.state.dataFinal;

        if(dataInicial == ''){
            var mes = diasAtras.getMonth() + 1;
            if(mes < 10){
                mes = '0' + mes;
            }

            var dia = diasAtras.getDate();
            if(dia < 10){
                dia = '0' + dia;
            }

            dataInicial = dia + '/' + mes + '/' + diasAtras.getFullYear();

            this.setState({dataInicial});
        }

        if(dataFinal == ''){
            var mes = diasAFrente.getMonth() + 1;
            if(mes < 10){
                mes = '0' + mes;
            }

            var dia = diasAFrente.getDate();
            if(dia < 10){
                dia = '0' + dia;
            }

            dataFinal = dia + '/' + mes + '/' + diasAFrente.getFullYear();

            this.setState({dataInicial, dataFinal});
        }

        var dataInicialArray = dataInicial.split('/');
        var dataInicialParameter = dataInicialArray[2] + '-'+ dataInicialArray[1] + '-' + dataInicialArray[0];

        var dataFinalArray = dataFinal.split('/');
        var dataFinalParameter = dataFinalArray[2] + '-'+ dataFinalArray[1] + '-' + dataFinalArray[0];

        var argumentos = `dataInicial=${dataInicialParameter}&dataFinal=${dataFinalParameter}`;

        try{
            const call = await fetch(`http://painel.sualavanderia.com.br/api/BuscarVisita.aspx?${argumentos}&login=${email}&senha=${hash}`, 
                { 
                    method: 'post' 
                });
            const response = await call.json();

            var objetos = [];

            for(index in response){
                const objetoResponse = response[index];

                const objeto = {
                    oid: objetoResponse.Oid,
                    modo: objetoResponse.Modo,
                    atendente: objetoResponse.Atendente,
                    dataDaSolicitacao: objetoResponse.DataDaSolicitacao,
                    horaDaSolicitacao: objetoResponse.HoraDaSolicitacao,
                    data: objetoResponse.Data,
                    dataHora: objetoResponse.DataHora,
                    dataHoraString: objetoResponse.DataHoraString,
                    cliente: objetoResponse.Cliente,
                    visitante: objetoResponse.Visitante,
                    atendida: objetoResponse.Atendida,
                    telefone: objetoResponse.Telefone,
                    comentario: objetoResponse.Comentario,
                    instrucoes: objetoResponse.Instrucoes,
                    endereco: objetoResponse.Endereco,
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

    openModal = (objeto) => {
        this.setState({confirmacaoModalVisible: true, objeto});
    };

    openModalListaDeCompras = () => {
        this.setState({listaDeComprasModalVisible: true});
    };
    
    closeModal = () => {
        this.setState({confirmacaoModalVisible: false});
    };

    closeModalListaDeCompras = () => {
        this.setState({listaDeComprasModalVisible: false});
    };

    pagar(){
        const lavagem = this.state.objeto.lavagem;
        
        if(lavagem.paga != 'Não/Parcialmente'){
            alert("Essa lavagem já está paga!");
        }else{
            this.setState({confirmacaoModalVisible: false});
            this.props.navigation.navigate('MovimentacaoDeCaixaDetails', {lavagem: lavagem, reload: this.buscar.bind(this)});
        }
    }

    navegarParaPagar = () => {
        this.pagar();
    };

    navegarParaWaze = () => {
        const objeto = this.state.objeto;
        Linking.openURL(`https://waze.com/ul?q=${objeto.endereco}&navigate=yes`); 
    };

    navegarParaLigar = () => {
        const objeto = this.state.objeto;
        
        Linking.openURL(`tel:${objeto.telefone}`); 
    };

    navegarParaNovo = () => {
        this.props.navigation.navigate('BuscaDetails', {reload: this.buscar.bind(this)});
    };

    acao = async () => {
        this.setState({confirmacaoModalVisible: false, modalVisible: true});

        var usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));
        var hash = this.hash(usuario);
        var email = usuario.email;
        var argumentos = `oid=${this.state.objeto.oid}&atendida=true`;

        try {
            const call = await fetch(`http://painel.sualavanderia.com.br/api/AtualizarVisita.aspx?${argumentos}&login=${email}&senha=${hash}`,
                {
                    method: 'post'
                });

            if (call.status != 200) {
                alert('Erro.' + call.statusText);
            }
        } catch (erro) {
            alert('Erro.' + erro);
        }

        this.setState({modalVisible: false});
        this.buscar();
    };

    navegarParaListaDeCompras = async (dataDaCompra) => {
        this.setState({listaDeComprasModalVisible: false});
        this.props.navigation.navigate('ListaDeCompras', {dataDaCompra: dataDaCompra});
    };

    openVideoInformativo = () => {
        //Linking.openURL("http://sualavanderia.com.br/videos/MaterialScreen.mp4");
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
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

                <ScrollView contentContainerStyle={styles.objetoList}>
                    {this.state.objetos.map(objeto => 
                        <TouchableOpacity key={objeto.oid} onPress={() => this.openModal(objeto)}>
                            <Visita key={objeto.oid} objeto={objeto} />
                        </TouchableOpacity>
                    )}
                </ScrollView>

                <LoadingModal modalVisible={this.state.modalVisible} />

                <ConfirmacaoModalVisita visible={this.state.confirmacaoModalVisible} texto="Confirmar Atendida?" 
                    onSim={this.acao} onNao={this.closeModal}
                    onWaze={this.navegarParaWaze} onLigar={this.navegarParaLigar}  />
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
            justifyContent: 'center',
            backgroundColor: '#FFF',
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
    }
);