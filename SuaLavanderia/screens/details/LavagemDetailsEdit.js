import React from 'react';
import {StyleSheet, View, ScrollView, Image, Text, TouchableOpacity, Picker, TextInput, AsyncStorage } from 'react-native';
import fetch from '../../utils/FetchWithTimeout';

export default class LavagemDetailsEdit extends React.Component {

    state ={
        nome: '',
        modalVisible: false,
        status: '0',
        valor: '0',
        quantidadeDePecas: '0',
        lavagem: {},
    };

    LavagemDetailsEdit(){
        this.buscar = this.buscar.bind(this);
    }

    async componentWillMount(){
        const lavagem = this.props.navigation.getParam('lavagem');
        var status = lavagem.status;
        var valor = lavagem.valor;
        var quantidadeDePecas = lavagem.quantidadeDePecas;

        this.setState({lavagem, status, valor, quantidadeDePecas});
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

    async salvar(props) {
        var usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));//this.getUser();
        var hash = this.hash(usuario);
        var email = usuario.email;

        const lavagem = this.state.lavagem;

        var status = '0';

        switch(this.state.status){
            case 'Anotada': status = 0; break;
            case 'Lavando': status = 1; break;
            case 'Passando': status = 2; break;
            case 'EmDeslocamentoParaOPontoDeColeta': status = 3; break;
            case 'Pronta': status = 4; break;
            case 'Entregue': capital = 5; break;
            default: ;
        }

        var argumentos = 'status=' + status + '&valor=' + this.state.valor + '&oid=' + lavagem.oid + '&quantidadeDePecas=' + this.state.quantidadeDePecas;

        const call = await fetch(`http://painel.sualavanderia.com.br/api/AdicionarLavagem.aspx?${argumentos}&login=${email}&senha=${hash}`, 
            { 
                method: 'post' 
            }).then(function(response){
                if(response.status == 200){
                    alert(lavagem == null ? 'Adicionado com sucesso!' : 'Alterado com sucesso!');

                    props.navigation.state.params.reload();
                    props.navigation.goBack();
                }else{
                    alert('Erro adicionando/alterando lavagem.');    
                }
            }
            ).catch(function(error){
                alert('Erro adicionando/alterando lavagem.' + error);    
            });        
    }

    render(){
        const lavagem = this.state.lavagem;

        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.infoTitle}>Edição de Lavagem</Text>

                    <TouchableOpacity onPress={() => this.salvar(this.props)} style={styles.button}>
                        <Image style={styles.icon} source={require('../../images/salvar_32x32.png')} />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.unidadeContainer}>
                        <View style={styles.lavagemInfoContainerCliente}>
                            <Text style={styles.lavagemInfoCliente}>{lavagem.cliente} ({lavagem.codigoDoCliente})</Text>
                        </View>

                        <View style={styles.lavagemInfoContainer}>
                            <Text style={styles.lavagemInfoTitle}>Unidade: </Text>
                            <Text style={styles.lavagemInfo}>{lavagem.unidadeDeRecebimento}</Text>
                        </View>

                        <View style={styles.lavagemInfoContainer}>
                            <Text style={styles.lavagemInfoTitle}>Data de Recebimento: </Text>
                            <Text style={styles.lavagemInfo}>{lavagem.dataDeRecebimento}</Text>
                        </View>

                        <View style={styles.lavagemInfoContainer}>
                            <Text style={styles.lavagemInfoTitle}>Data Preferível para Entrega: </Text>
                            <Text style={styles.lavagemInfo}>{lavagem.dataPreferivelParaEntrega}</Text>
                        </View>

                        <View style={styles.lavagemInfoContainer}>
                            <Text style={styles.lavagemInfoTitle}>Data de Entrega: </Text>
                            <Text style={styles.lavagemInfo}>{lavagem.dataDeEntrega}</Text>
                        </View>

                        <View style={styles.lavagemInfoContainer}>
                            <Text style={styles.lavagemInfoTitle}>Status: </Text>
                            <Picker
                                style={styles.boxInput}
                                selectedValue={this.state.status}
                                onValueChange={(itemValue, itemIndex) => this.setState({status: itemValue})}>
                                <Picker.Item label='Anotada' value='Anotada' />
                                <Picker.Item label='Lavando' value='Lavando' />
                                <Picker.Item label='Passando' value='Passando' />
                                <Picker.Item label='Em Deslocamento para o Ponto de Coleta' value='EmDeslocamentoParaOPontoDeColeta' />
                                <Picker.Item label='Pronta' value='Pronta' />
                                <Picker.Item label='Entregue' value='Entregue' />
                            </Picker>
                        </View>

                        <View style={styles.lavagemInfoContainer}>
                            <Text style={styles.lavagemInfoTitle}>Quantidade de Peças: </Text>
                            <TextInput
                                style={styles.boxInput}
                                value={this.state.quantidadeDePecas}
                                keyboardType='numeric'
                                onChangeText={quantidadeDePecas => this.setState({quantidadeDePecas})}
                            />
                        </View>

                        <View style={styles.lavagemInfoContainer}>
                            <Text style={styles.lavagemInfoTitle}>Valor: </Text>
                            <TextInput
                                style={styles.boxInput}
                                value={this.state.valor}
                                keyboardType='numeric'
                                onChangeText={valor => this.setState({valor})}
                            />
                        </View>

                        <View style={styles.lavagemInfoContainer}>
                            <Text style={styles.lavagemInfoTitle}>Paga: </Text>
                            <Text style={styles.lavagemInfo}>{lavagem.paga}</Text>
                        </View>

                        <View style={styles.lavagemInfoContainer}>
                            <Text style={styles.lavagemInfoTitle}>Saldo Devedor: </Text>
                            <Text style={styles.lavagemInfo}>R$ {lavagem.saldoDevedor}</Text>
                        </View>

                        <View style={styles.lavagemInfoContainer}>
                            <Text style={styles.lavagemInfoTitle}>Avaliação: </Text>
                            <Text style={styles.lavagemInfo}>{lavagem.avaliacao != null ? lavagem.avaliacao.media : null}</Text>
                        </View>
                    </View>
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
          header:{
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: 40,
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
            padding: 5,
            borderRadius: 5,
        },
        buttonText: {
            fontWeight: 'bold',
        },
        unidadeContainer: {
            borderRadius: 5,
            backgroundColor: '#FFF',
            padding: 10,
            margin: 20,
            justifyContent: 'center',
        },
        lavagemInfoContainer: {
            marginTop: 5,
        },
        lavagemInfoInput: {
            marginTop: 5,
        },
        lavagemInfoContainerCliente: {
            alignItems: 'center',
        },
        lavagemInfoTitle: {
            fontWeight: 'bold',
        },
        lavagemInfo: {
        },
        lavagemInfoCliente: {
            fontSize: 20,
            fontWeight: 'bold',
        },
        button:{
            margin: 10,
        },
        icon: {
            width: 24,
            height: 24,
        },
        roupasContainer: {
            alignItems: 'center',
            backgroundColor: '#F8F8F8',
            borderRadius: 5, 
            marginLeft: 20,
            marginRight: 20,
        },
        roupasTitle: {
            fontSize: 18,
            fontWeight: 'bold',
        },
    }
);