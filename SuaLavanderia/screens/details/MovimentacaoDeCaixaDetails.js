import React from 'react';
import {StyleSheet, View, ScrollView, Image, Text, TextInput, TouchableOpacity } from 'react-native';

export default class MovimentacaoDeCaixaDetails extends React.Component {

    state ={
        oid: 'novo pagamento',
        valor: '',
        observacoes: '',
        capital: 'Dinheiro',
        data: '',
        modo: 'Saida',
    };

    componentDidMount(){
        const movimentacao = this.props.navigation.getParam('movimentacao');

        if(movimentacao != null){
            const oid = movimentacao.oid;
            const valor = movimentacao.valor.toString();
            const observacoes = movimentacao.observacoes;
            const capital = movimentacao.capital;
            const data = movimentacao.data;
            const modo = movimentacao.modo;

            this.setState({oid, valor, observacoes, capital, data, modo});
        }
    }

    salvar = async () => {
        const movimentacao = this.props.navigation.getParam('movimentacao');
        const responsavelOid = 'elenilsonvieira@gmail.com';

        var argumentos = '';

        if(movimentacao != null){
            argumentos += 'responsavelOid=' + movimentacao.responsavelOid;
        }

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

        argumentos += '&data=' + this.state.data + '&capital=' + capital + '&valor=' + this.state.valor + '&observacoes=' + this.state.observacoes + '&responsavelOid=' + responsavelOid + '&modo=' + this.state.modo;

        if(movimentacao != null){
            argumentos += '&oid=' + movimentacao.oid;
        }

        const call = await fetch(`http://painel.sualavanderia.com.br/api/AdicionarMovimentacaoDeCaixa.aspx?${argumentos}`, 
            { 
                method: 'post' 
            }).then(function(response){
                alert(movimentacao == null ? 'Adicionado com sucesso!' : 'Alterado com sucesso!');
                //this.props.navigation.goBack();
            }
            ).catch(function(error){
                alert('Erro adicionando a movimentação de caixa.' + error);    
            });
        
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.salvar} style={styles.button}>
                        <Image style={styles.icon} source={require('../../images/salvar_32x32.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.button}>
                        <Image style={styles.icon} source={require('../../images/cancelar_32x32.png')} />
                    </TouchableOpacity>
                </View>

                <View style={styles.movimentacaoContainer}>
                    <Text style={styles.valorInfoTitle}>Oid: {this.state.oid}</Text>

                    <Text style={styles.infoTitle}>Data: </Text>
                    <TextInput
                        style={styles.boxInput}
                        value={this.state.data}
                        onChangeText={data => this.setState({data})}
                    />

                    <Text style={styles.infoTitle}>Modo: </Text>
                    <TextInput
                        style={styles.boxInput}
                        value={this.state.modo}
                        onChangeText={modo => this.setState({modo})}
                    />

                    <Text style={styles.infoTitle}>Valor: </Text>
                    <TextInput
                        style={styles.boxInput}
                        value={this.state.valor}
                        onChangeText={valor => this.setState({valor})}
                    />

                    <Text style={styles.infoTitle}>Capital: </Text>
                    <TextInput
                        style={styles.boxInput}
                        value={this.state.capital}
                        onChangeText={capital => this.setState({capital})}
                    />

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
          objetoList: {
              paddingTop: 20,
          },
          header:{
            alignItems: 'center',
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