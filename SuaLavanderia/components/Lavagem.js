import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from './Text';

export default class Lavagem extends React.Component {

    render(){
        var estiloDeAlerta = {};

        if(this.props.lavagem.alertaAmarelo){
            estiloDeAlerta = styles.alertaAmarelo;
        }else if(this.props.lavagem.alertaVerde){
            estiloDeAlerta = styles.alertaVerde;
        }else if(this.props.lavagem.alertaVermelho){
            estiloDeAlerta = styles.alertaVermelho;
        }else if(this.props.lavagem.alertaCinza){
            estiloDeAlerta = styles.alertaCinza;
        } 

        return(
            <View style={styles.container}>
                <View style={[styles.unidadeContainer, estiloDeAlerta]}>
                    <View style={styles.lavagemInfoContainerCliente}>
                        <Text style={styles.lavagemInfoCliente}>{this.props.lavagem.cliente} ({this.props.lavagem.codigoDoCliente})</Text>
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
                        <Text style={styles.lavagemInfoTitle}>Data Preferível para Entrega: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.lavagem.dataPreferivelParaEntrega}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Data de Entrega: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.lavagem.dataDeEntrega}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Status: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.lavagem.status}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Quantidade de Peças: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.lavagem.quantidadeDePecas}</Text>
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
                        <Text style={styles.lavagemInfoTitle}>Paga: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.lavagem.paga}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Avaliação: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.lavagem.avaliacao != null ? this.props.lavagem.avaliacao.media : null}</Text>
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
        },
        lavagemInfo: {
        },
        lavagemInfoCliente: {
            fontSize: 20,
            fontWeight: 'bold',
        },
        button:{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            margin: 10,
            padding: 10,
            backgroundColor: '#DDD',
        },alertaAmarelo: { 
            borderWidth: 10, 
            borderColor: 'yellow'
        },
        alertaVermelho: { 
            borderWidth: 10, 
            borderColor: 'red'
        },
        alertaVerde: { 
            borderWidth: 10, 
            borderColor: 'green'
        },alertaCinza: { 
            borderWidth: 10, 
            borderColor: 'gray'
        }
    }
);