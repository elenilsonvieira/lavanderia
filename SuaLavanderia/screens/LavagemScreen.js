import React from 'react';
import {StyleSheet, View, ScrollView, Image, Text, TextInput, TouchableOpacity, Picker } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Lavagem from "../components/Lavagem";

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
        status: '0',
        objetos: [],
    };

    buscar = async () => {
        var hoje = new Date();
        var mes = hoje.getMonth() + 1;

        if(mes < 10){
            mes = '0' + mes;
        }

        var dataInicial = this.state.dataInicial;
        var dataFinal = this.state.dataFinal;

        if(dataInicial == '' || dataFinal == ''){
            dataInicial = hoje.getDate() + '/' + mes + '/' + hoje.getFullYear();
             dataFinal = hoje.getDate() + '/' + mes + '/' + hoje.getFullYear();

            this.setState({dataInicial, dataFinal});
        }

        var dataInicialArray = dataInicial.split('/');
        var dataInicialParameter = dataInicialArray[2] + '-'+ dataInicialArray[1] + '-' + dataInicialArray[0];

        var dataFinalArray = dataFinal.split('/');
        var dataFinalParameter = dataFinalArray[2] + '-'+ dataFinalArray[1] + '-' + dataFinalArray[0];

        var argumentos = `status=${this.state.status}&dataInicial=${dataInicialParameter}&dataFinal=${dataFinalParameter}`;

        if(this.state.nome != ''){
            argumentos += '&nome=' + this.state.nome;
        }

        const call = await fetch(`http://painel.sualavanderia.com.br/api/BuscarLavagem.aspx?${argumentos}`);
        const response = await call.json();

        var objetos = [];

        for(index in response){
            const objetoResponse = response[index];
            var roupas = [];

            for(indexRoupa in objetoResponse.Roupas){
                const roupaResponse = objetoResponse.Roupas[indexRoupa];

                const roupaEmLavagem = {
                    quantidade: roupaResponse.Quantidade,
                    observacoes: roupaResponse.Observacoes,
                    soPassar: roupaResponse.SoPassar,
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
                dataDeRecebimento: objetoResponse.DataDeRecebimento,
                dataPreferivelParaEntrega: objetoResponse.DataPreferivelParaEntrega,
                dataDeEntrega: objetoResponse.DataDeEntrega,
                valor: objetoResponse.Valor,
                paga: objetoResponse.Paga,
                unidadeDeRecebimentoOid: objetoResponse.UnidadeDeRecebimentoOid,
                unidadeDeRecebimento: objetoResponse.UnidadeDeRecebimento,
                roupas: roupas,
                status: objetoResponse.Status,
            };    

            objetos = [...objetos, objeto];
        }

        this.setState({objetos});
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
            width: 100,
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