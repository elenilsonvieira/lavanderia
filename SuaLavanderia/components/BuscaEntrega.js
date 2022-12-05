import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from './Text';

export default class BuscaEntrega extends React.Component {

    render(){
        var estiloDeAlerta = {};

        if(this.props.objeto.atendida){
            estiloDeAlerta = styles.alertaVerde;
        } 

        return(
            <View style={styles.container}>
                <View style={[styles.unidadeContainer, estiloDeAlerta]}>
                    <View style={styles.lavagemInfoContainerCliente}>
                        <Text style={styles.lavagemInfoCliente}>{this.props.objeto.tipo}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Cliente: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.objeto.cliente}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Endereço: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.objeto.endereco}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Data e Hora: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.objeto.dataHora}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Telefone: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.objeto.telefone}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Valor: </Text>
                        <Text style={styles.lavagemInfo}>R$ {this.props.objeto.lavagem != null ? this.props.objeto.lavagem.valor : ''}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Saldo Devedor: </Text>
                        <Text style={styles.lavagemInfo}>R$ {this.props.objeto.lavagem != null ? this.props.objeto.lavagem.saldoDevedor : ''}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Paga: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.objeto.lavagem != null ? this.props.objeto.lavagem.paga : ''}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Unidade: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.objeto.unidade}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Observações: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.objeto.observacoes}</Text>
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
        },
        alertaAmarelo: { 
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
        }
    }
);