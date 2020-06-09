import React from 'react';
import {StyleSheet, View, ScrollView, Image, Text, TextInput, TouchableOpacity, Picker, AsyncStorage } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import LavagemOperacoes from "../components/LavagemOperacoes";
import LoadingModal from '../components/modals/LoadingModal';
import ConfirmacaoModalComDetalhes from '../components/modals/ConfirmacaoModalComDetalhes';

export default class OperacaoEmpacotarScreen extends React.Component {

    state ={
        dataInicial: '',
        dataFinal: '',
        objetos: [],
        lavagem: {},
        modalVisible: false,
        confirmacaoModalVisible: false,
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
        var diasAtras = new Date(hoje.getTime() - 3 * 24*60*60*1000);

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
            var mes = hoje.getMonth() + 1;
            if(mes < 10){
                mes = '0' + mes;
            }

            var dia = hoje.getDate();
            if(dia < 10){
                dia = '0' + dia;
            }

            dataFinal = dia + '/' + mes + '/' + hoje.getFullYear();

            this.setState({dataInicial, dataFinal});
        }

        var dataInicialArray = dataInicial.split('/');
        var dataInicialParameter = dataInicialArray[2] + '-'+ dataInicialArray[1] + '-' + dataInicialArray[0];

        var dataFinalArray = dataFinal.split('/');
        var dataFinalParameter = dataFinalArray[2] + '-'+ dataFinalArray[1] + '-' + dataFinalArray[0];

        var argumentos = `status=2&dataInicial=${dataInicialParameter}&dataFinal=${dataFinalParameter}&usarDataPreferivelParaEntrega=true&empacotada=false`;

        try{
            const call = await fetch(`http://painel.sualavanderia.com.br/api/BuscarLavagem.aspx?${argumentos}&login=${email}&senha=${hash}`, 
                { 
                    method: 'post' 
                });
            const response = await call.json();

            var objetos = [];

            for(index in response){
                const objetoResponse = response[index];
                var roupas = [];

                for(indexRoupa in objetoResponse.Roupas){
                    const roupaResponse = objetoResponse.Roupas[indexRoupa];

                    const roupaEmLavagem = {
                        oid: roupaResponse.Oid,
                        quantidade: roupaResponse.Quantidade,
                        observacoes: roupaResponse.Observacoes,
                        soPassar: roupaResponse.SoPassar,
                        pacoteDeRoupa: roupaResponse.PacoteDeRoupa,
                        cliente: roupaResponse.Cliente,
                        clienteOid: roupaResponse.ClienteOid,
                        codigoDoCliente: roupaResponse.CodigoDoCliente,
                        roupa: {
                            oid: roupaResponse.Roupa.Oid,
                            tipo: roupaResponse.Roupa.Tipo,
                            tecido: roupaResponse.Roupa.Tecido,
                            tamanho: roupaResponse.Roupa.Tamanho,
                            marca: roupaResponse.Roupa.Marca,
                            cliente: roupaResponse.Roupa.Cliente,
                            clienteOid: roupaResponse.Roupa.ClienteOid,
                            observacao: roupaResponse.Roupa.Observacao,
                            codigo: roupaResponse.Roupa.Codigo,
                            chave: roupaResponse.Roupa.Chave,
                            cores: roupaResponse.Roupa.Cores,
                        },
                    };

                    roupas = [...roupas, roupaEmLavagem];
                }

                const objeto = {
                    oid: objetoResponse.Oid,
                    cliente: objetoResponse.Cliente,
                    clienteOid: objetoResponse.ClienteOid,
                    codigoDoCliente: objetoResponse.CodigoDoCliente,
                    dataDeRecebimento: objetoResponse.DataDeRecebimento,
                    dataPreferivelParaEntrega: objetoResponse.DataPreferivelParaEntrega,
                    dataDeEntrega: objetoResponse.DataDeEntrega,
                    valor: objetoResponse.Valor,
                    paga: objetoResponse.Paga,
                    unidadeDeRecebimentoOid: objetoResponse.UnidadeDeRecebimentoOid,
                    unidadeDeRecebimento: objetoResponse.UnidadeDeRecebimento,
                    quantidadeDePecas: objetoResponse.QuantidadeDePecas,
                    pesoDaPassagem: objetoResponse.PesoDaPassagem,
                    roupas: roupas,
                    status: objetoResponse.Status,
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

    openModal = (lavagem) => {
        this.setState({confirmacaoModalVisible: true, lavagem});
    };
    
    closeModal = () => {
        this.setState({confirmacaoModalVisible: false});
    };

    navegarParaDetalhes = () => {
        this.setState({confirmacaoModalVisible: false});
        this.props.navigation.navigate("LavagemDetailsOperacaoEmpacotar", { lavagem: this.state.lavagem, acao: this.acao, texto: "Confirmar empacotar tudo?", usuarioOid: this.props.navigation.getParam('usuarioOid') })
    };

    acao = async () => {
        this.setState({confirmacaoModalVisible: false, modalVisible: true});

        var usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));
        var hash = this.hash(usuario);
        var email = usuario.email;
        var usuarioOid = this.props.navigation.getParam('usuarioOid');
        var usarUsuarioLogado = false;

        if(!usuarioOid){
            usuarioOid = usuario.oid;
            usarUsuarioLogado = true;
        }

        var argumentos = `lavagemOid=${this.state.lavagem.oid}&usuarioOid=${usuarioOid}&tipoDePacote=dobrada`;

        try{
            const call = await fetch(`http://painel.sualavanderia.com.br/api/EmpacotarRoupa.aspx?${argumentos}&login=${email}&senha=${hash}`, 
                { 
                    method: 'post' 
                });
            
            if(call.status != 200){
                alert('Erro.' + call.statusText);    
            }            
        }catch(erro){
            alert('Erro.' + erro);
        }

        this.setState({modalVisible: false});

        if(usarUsuarioLogado){
            this.props.navigation.navigate('OperacaoEmpacotar');
            this.buscar();
        }else{
            this.props.navigation.navigate('Home');
        }
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

                            <TouchableOpacity onPress={this.buscar} style={styles.button}>
                                <Image style={styles.icon} source={require('../images/pesquisar_32x32.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.objetoList}>
                    {this.state.objetos.map(objeto => 
                        <TouchableOpacity key={objeto.oid} onPress={() => this.openModal(objeto)}>
                            <LavagemOperacoes key={objeto.oid} lavagem={objeto} />
                        </TouchableOpacity>
                    )}
                </ScrollView>

                <LoadingModal modalVisible={this.state.modalVisible} />
                <ConfirmacaoModalComDetalhes visible={this.state.confirmacaoModalVisible} texto="Confirmar empacotar tudo?" 
                    onSim={this.acao} onNao={this.closeModal} onDetalhes={this.navegarParaDetalhes}/>
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
    }
);