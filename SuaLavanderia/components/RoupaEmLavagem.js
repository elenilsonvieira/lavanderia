import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Roupa from './Roupa';

export default class RoupaEmLavagem extends React.Component {

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.unidadeContainer}>
                    <View style={styles.lavagemInfoContainerCliente}>
                        <Text style={styles.lavagemInfoCliente}>{this.props.roupaEmLavagem.cliente}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Quantidade: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.roupaEmLavagem.quantidade}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Só Passar?: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.roupaEmLavagem.soPassar ? 'Sim' : 'Não'}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Observações: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.roupaEmLavagem.observacoes}</Text>
                    </View>

                    <View style={styles.roupaContainer}>
                        <Roupa roupa={this.props.roupaEmLavagem.roupa}/>
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
            backgroundColor: '#F0F0F0',
            padding: 20,
            margin: 20,
            justifyContent: 'center',
            borderColor: 'black',
        },
    }
);