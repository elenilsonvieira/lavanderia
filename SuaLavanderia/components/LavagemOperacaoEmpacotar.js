import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class LavagemOperacaoEmpacotar extends React.Component {

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.unidadeContainer}>
                    <View style={styles.lavagemInfoContainerCliente}>
                        <Text style={styles.lavagemInfoCliente}>{this.props.lavagem.cliente} ({this.props.lavagem.codigoDoCliente})</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Quantidade de Peças: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.lavagem.quantidadeDePecas}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Unidade: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.lavagem.unidadeDeRecebimento}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Data de Recebimento: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.lavagem.dataDeRecebimento}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Data para Entrega: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.lavagem.dataPreferivelParaEntrega}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Hora para Entrega: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.lavagem.horaPreferivelParaEntrega}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Status: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.lavagem.status}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Só Passar? </Text>
                        <Text style={styles.lavagemInfo}>{this.props.lavagem.soPassar ? 'Sim' : 'Não'}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Peso da Passagem: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.lavagem.pesoDaPassagem}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Observações: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.lavagem.observacoes}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Recolhida do Varal? </Text>
                        <Text style={styles.lavagemInfo}>{this.props.lavagem.recolhidaDoVaralString}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Passadores: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.lavagem.passadoresString}</Text>
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
        unidadeContainer: {
            borderRadius: 5,
            backgroundColor: '#FFF',
            padding: 20,
            margin: 20,
            justifyContent: 'center',
        },
        lavagemInfoContainer: {
            flexDirection: 'row',
        },
        lavagemInfoContainerCliente: {
            alignItems: 'center',
        },
        lavagemInfoTitle: {
            fontWeight: 'bold',
            fontSize: 16,
        },
        lavagemInfo: {
            fontSize: 16,
        },
        lavagemInfoCliente: {
            fontSize: 30,
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
    }
);