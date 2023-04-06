import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from './Text';

export default class DadosDePassagem extends React.Component {

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.unidadeContainer}>
                    <View style={styles.lavagemInfoContainerCliente}>
                        <Text style={styles.lavagemInfoCliente}>{this.props.objeto.funcionario}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Peças Passadas: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.objeto.totalDePecas}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Peso Passado: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.objeto.totalDePeso}</Text>
                    </View>

                    {  
                    this.props.objeto.operacoes.map(operacao => 
                        <View style={styles.lavagemInfoContainerCliente3} key={operacao.data + operacao.cliente}>
                            <View style={styles.lavagemInfoContainerCliente2}>
                                <Text style={styles.lavagemInfoCliente2}>{operacao.cliente}</Text>
                            </View>

                            <View style={styles.lavagemInfoContainer}>
                                <Text style={styles.lavagemInfoTitle2}>Data para Entrega: </Text>
                                <Text style={styles.lavagemInfo2}>{operacao.dataParaEntrega}</Text>
                            </View>

                            <View style={styles.lavagemInfoContainer}>
                                <Text style={styles.lavagemInfoTitle2}>Peças: </Text>
                                <Text style={styles.lavagemInfo2}>{operacao.totalDePecas}</Text>
                            </View>

                            <View style={styles.lavagemInfoContainer}>
                                <Text style={styles.lavagemInfoTitle2}>Peso: </Text>
                                <Text style={styles.lavagemInfo2}>{operacao.totalDePeso}</Text>
                            </View>

                            <View style={styles.lavagemInfoContainer}>
                                <Text style={styles.lavagemInfoTitle2}>Começou a passar: </Text>
                                <Text style={styles.lavagemInfo2}>{operacao.data}</Text>
                            </View>
                        </View>
                    )}
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
            padding: 10,
            margin: 10,
            justifyContent: 'center',
        },
        lavagemInfoContainer: {
            flexDirection: 'row',
        },
        lavagemInfoContainerCliente: {
            alignItems: 'center',
        },
        lavagemInfoContainerCliente2: {
            alignItems: 'center',
            fontSize: 13,
        },
        lavagemInfoTitle: {
            fontWeight: 'bold',
            fontSize: 15,
        },
        lavagemInfoTitle2: {
            fontWeight: 'bold',
            fontSize: 14,
        },
        lavagemInfo: {
            fontSize: 15,
        },
        lavagemInfo2: {
            fontSize: 14,
        },
        lavagemInfoCliente: {
            fontSize: 22,
            fontWeight: 'bold',
        },
        lavagemInfoCliente2: {
            fontSize: 16,
            fontWeight: 'bold',
        },
        lavagemInfoContainerCliente3: {
            marginTop: 5,
            backgroundColor: '#F8F8F8',
        },
        button:{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            margin: 10,
            padding: 10,
            backgroundColor: '#DDD',
        },
        roupasContainer: {
            alignItems: 'center',
            backgroundColor: '#F8F8F8',
            borderRadius: 5, 
            marginLeft: 20,
            marginRight: 20,
            marginTop: 10,
        },
    }
);