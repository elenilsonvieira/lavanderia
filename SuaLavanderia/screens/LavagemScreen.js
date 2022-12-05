import React from 'react';
import {StyleSheet, View, ScrollView, Image, TextInput, TouchableOpacity, Linking } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Lavagem from "../components/Lavagem";
import LoadingModal from '../components/modals/LoadingModal';
import fetch from '../utils/FetchWithTimeout';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Text from '../components/Text';

export default class LavagemScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Lavagem',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../images/lavagem_32x32.png')}
            style={styles.icon}
          />
        ),
      };

    state ={
        dataInicial: '',
        dataFinal: '',
        nome: '',
        status: '',
        objetos: [],
        modalVisible: false,
        datasAlteradas: false,
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

        var usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));//this.getUser();
        var hash = this.hash(usuario);
        var email = usuario.email;

        var hoje = new Date();
        var diasAtras = new Date(new Date().getTime() - 7 * 24*60*60*1000);

        var dataInicial = this.state.dataInicial;
        var dataFinal = this.state.dataFinal;
        var dataInicialAlterada = false;

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

        if(this.state.nome && !this.state.datasAlteradas){
            diasAtras = new Date(new Date().getTime() - 90 * 24*60*60*1000);
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

        var dataInicialArray = dataInicial.split('/');
        var dataInicialParameter = dataInicialArray[2] + '-'+ dataInicialArray[1] + '-' + dataInicialArray[0];

        var dataFinalArray = dataFinal.split('/');
        var dataFinalParameter = dataFinalArray[2] + '-'+ dataFinalArray[1] + '-' + dataFinalArray[0];

        var argumentos = `status=${this.state.status}&dataInicial=${dataInicialParameter}&dataFinal=${dataFinalParameter}&incluirRoupas=false`;

        if(this.state.nome != ''){
            argumentos += '&nome=' + this.state.nome;
        }

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

                if(this.state.nome == '' || objetoResponse.Cliente.toLowerCase().includes(this.state.nome.trim().toLowerCase())){
                    for(indexRoupa in objetoResponse.Roupas){
                        const roupaResponse = objetoResponse.Roupas[indexRoupa];

                        const roupaEmLavagem = {
                            oid: roupaResponse.Oid,
                            quantidade: roupaResponse.Quantidade,
                            observacoes: roupaResponse.Observacoes,
                            soPassar: roupaResponse.SoPassar,
                            cliente: roupaResponse.Cliente,
                            clienteOid: roupaResponse.ClienteOid,
                            codigoDoCliente: roupaResponse.CodigoDoCliente,
                            pacoteDeRoupa: roupaResponse.PacoteDeRoupa,
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

                    var avaliacao = null;

                    if(objetoResponse.Avaliacao){
                        avaliacao = {
                            data: objetoResponse.Avaliacao.Data,
                            notaDoAtendimento: objetoResponse.Avaliacao.NotaDoAtendimento,
                            notaDaLavagem: objetoResponse.Avaliacao.NotaDaLavagem,
                            notaDaPassagem: objetoResponse.Avaliacao.NotaDaPassagem,
                            notaDaEntrega: objetoResponse.Avaliacao.NotaDaEntrega,
                            comentarios: objetoResponse.Avaliacao.Comentarios,
                            media: (parseInt(objetoResponse.Avaliacao.NotaDoAtendimento) + parseInt(objetoResponse.Avaliacao.NotaDaLavagem) + parseInt(objetoResponse.Avaliacao.NotaDaPassagem) + parseInt(objetoResponse.Avaliacao.NotaDaEntrega)) / 4,//objetoResponse.Media,
                        };
                    }

                    const objeto = {
                        oid: objetoResponse.Oid,
                        cliente: objetoResponse.Cliente,
                        clienteOid: objetoResponse.ClienteOid,
                        codigoDoCliente: objetoResponse.CodigoDoCliente,
                        dataDeRecebimento: objetoResponse.DataDeRecebimento,
                        dataPreferivelParaEntrega: objetoResponse.DataPreferivelParaEntrega,
                        horaPreferivelParaEntrega: objetoResponse.HoraPreferivelParaEntrega,
                        empacotada: objetoResponse.Empacotada,
                        soPassar: objetoResponse.SoPassar,
                        dataDeEntrega: objetoResponse.DataDeEntrega,
                        valor: objetoResponse.Valor,
                        saldoDevedor: objetoResponse.SaldoDevedor,
                        paga: objetoResponse.Paga,
                        unidadeDeRecebimentoOid: objetoResponse.UnidadeDeRecebimentoOid,
                        unidadeDeRecebimento: objetoResponse.UnidadeDeRecebimento,
                        quantidadeDePecas: objetoResponse.QuantidadeDePecas,
                        observacoes: objetoResponse.Observacoes,
                        alertaAmarelo: objetoResponse.AlertaAmarelo,
                        alertaVerde: objetoResponse.AlertaVerde,
                        alertaVermelho: objetoResponse.AlertaVermelho,
                        alertaCinza: objetoResponse.AlertaCinza,
                        roupas: roupas,
                        status: objetoResponse.Status,
                        avaliacao: avaliacao,
                    };    

                    objetos = [...objetos, objeto];
                }
            }

            this.setState({objetos});
        }catch(erro){
            alert('Erro.' + erro);
        }

        this.setState({modalVisible: false});
    };

    filtrar =  () => {        
        if(this.state.nome.trim() !== '') {
            var objetos = [];

            this.state.objetos.map(objeto => {
                if(objeto.nome.toLowerCase().includes(this.state.nome.toLowerCase())){ 
                    objetos = [...objetos, objeto];
                }
            });

            this.setState({objetos});
        }
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
            datasAlteradas: true,
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
            datasAlteradas: true,
        });
    }

    openVideoInformativo = () => {
        Linking.openURL("http://sualavanderia.com.br/videos/LavagemScreen.mp4");
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
                                <Text style={styles.infoTitle}>Nome: </Text>
                                <TextInput
                                    style={styles.boxInput}
                                    value={this.state.nome}
                                    onChangeText={nome => this.setState({nome})} 
                                />
                            </View>
                        </View>
                        <View style={styles.viewHeaderSegundaLinha}>
                            <View style={styles.viewHeader}>
                                <Text style={styles.infoTitle}>Status: </Text>
                                <Picker
                                    style={styles.picker} 
                                    selectedValue={this.state.status}
                                    onValueChange={(itemValue, itemIndex) => this.setState({status: itemValue})} >
                                    <Picker.Item label='Anotada' value='0' />
                                    <Picker.Item label='Lavando' value='1' />
                                    <Picker.Item label='Passando' value='2' />
                                    <Picker.Item label='Em Deslocamento' value='3' />
                                    <Picker.Item label='Pronta' value='4' />
                                    <Picker.Item label='Entregue' value='5' />
                                    <Picker.Item label='Tudo' value='' />
                                </Picker>
                            </View>

                            <View style={styles.viewBotao}>
                                <TouchableOpacity onPress={this.buscar} style={styles.button}>
                                    <Image style={styles.icon} source={require('../images/pesquisar_32x32.png')} />
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
                        <TouchableOpacity key={objeto.oid} onPress={() => this.props.navigation.navigate('LavagemDetails', { lavagem: objeto })}>
                            <Lavagem key={objeto.oid} lavagem={objeto} />
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
            height: 130,
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