import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class MovimentacaoDeCaixa extends React.Component {

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.movimentacaoContainer}>
                    <View style={styles.movimentacaoInfoContainerTitle}>
                        <Text style={styles.movimentacaoInfoTitle}>R$ {this.props.movimentacao.valor} ({this.props.movimentacao.modo})</Text>
                    </View>

                    <View style={styles.movimentacaoInfoContainer}>
                        <View style={styles.valorInfoContainer}>
                            <Text style={styles.valorInfoTitle}>Data: </Text>
                            <Text style={styles.movimentacaoInfo}>{this.props.movimentacao.data}</Text>
                        </View>

                        <View style={styles.valorInfoContainer}>
                            <Text style={styles.valorInfoTitle}>Capital: </Text>
                            <Text style={styles.movimentacaoInfo}>{this.props.movimentacao.capital}</Text>
                        </View>

                        <View style={styles.valorInfoContainer}>
                            <Text style={styles.valorInfoTitle}>Tipo: </Text>
                            <Text style={styles.movimentacaoInfo}>{this.props.movimentacao.tipo}</Text>
                        </View>

                        <View style={styles.valorInfoContainer}>
                            <Text style={styles.valorInfoTitle}>Lavagem: </Text>
                            <Text style={styles.movimentacaoInfo}>{this.props.movimentacao.lavagem}</Text>
                        </View>

                        <View style={styles.valorInfoContainer}>
                            <Text style={styles.valorInfoTitle}>Conta de Saída: </Text>
                            <Text style={styles.movimentacaoInfo}>{this.props.movimentacao.contaDeSaida}</Text>
                        </View>

                        <View style={styles.valorInfoContainer}>
                            <Text style={styles.valorInfoTitle}>Conta de Entrada: </Text>
                            <Text style={styles.movimentacaoInfo}>{this.props.movimentacao.contaDeEntrada}</Text>
                        </View>

                        <View style={styles.valorInfoContainer}>
                            <Text style={styles.valorInfoTitle}>Responsável: </Text>
                            <Text style={styles.movimentacaoInfo}>{this.props.movimentacao.responsavel}</Text>
                        </View>

                        <View style={styles.valorInfoContainer}>
                            <Text style={styles.valorInfoTitle}>Conferidor: </Text>
                            <Text style={styles.movimentacaoInfo}>{this.props.movimentacao.conferidor}</Text>
                        </View>

                        <View style={styles.valorInfoContainer}>
                            <Text style={styles.valorInfoTitle}>Última Alteração: </Text>
                            <Text style={styles.movimentacaoInfo}>{this.props.movimentacao.dataDaUltimaAlteracao}</Text>
                        </View>

                        <View style={styles.valorInfoContainer}>
                            <Text style={styles.valorInfoTitle}>Observações: </Text>
                            <Text style={styles.movimentacaoInfo}>{this.props.movimentacao.observacoes}</Text>
                        </View>
                    </View>
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
            alignItems: 'center',
            justifyContent: 'space-between',
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
            width: 200,
            padding: 5,
        },
        buttonText: {
            fontWeight: 'bold',
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
        movimentacaoInfo: {
        },
        button:{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            margin: 10,
            padding: 10,
            backgroundColor: '#DDD',
        },
    }
);