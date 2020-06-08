import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class FechamentoDePonto extends React.Component {

    render(){
        return(
            <View style={styles.container}>
                <View style={[styles.unidadeContainer, this.props.styleExtra]}>
                    <View style={styles.lavagemInfoContainerCliente}>
                        <Text style={styles.lavagemInfoCliente}>{this.props.objeto.dataInicial} a {this.props.objeto.dataFinal}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Previsto: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.objeto.previsto}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}> 
                        <Text style={styles.lavagemInfoTitle}>Realizado: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.objeto.realizado}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Abonos: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.objeto.abonos}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Saldo: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.objeto.saldo}</Text>
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