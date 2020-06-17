import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Batida from './Batida';

export default class Ponto extends React.Component {

    render(){
        return(
            <View style={styles.container}>
                <View style={[styles.unidadeContainer, this.props.styleExtra]}>
                    <View style={styles.lavagemInfoContainerCliente}>
                        <Text style={styles.lavagemInfoCliente}>{this.props.objeto.data}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Horas Trabalhadas: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.objeto.horasTrabalhadas}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Horas Abonadas: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.objeto.horasAbonadas}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Ponto Válido: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.objeto.pontoValido ? 'Sim' : 'Não'}</Text>
                    </View>

                    <View style={styles.roupasContainer}>
                        <Text style={styles.lavagemInfoTitle}>Batidas</Text>
                        { this.props.objeto.batidas.map(batida => 
                            <Text key={batida.oid} style={styles.lavagemInfo}>{batida.hora}</Text>
                        )}
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
        roupaContainer: {
            borderRadius: 15,
            backgroundColor: '#F8F8F8',
            padding: 5,
            marginTop: 10,
            justifyContent: 'center',
            borderColor: 'black',
        },
        roupaInfoContainer: {
            flexDirection: 'row',
        },
        roupaInfoTitle: {
            fontWeight: 'bold',
        },
        roupaInfo: {
        },
    }
);