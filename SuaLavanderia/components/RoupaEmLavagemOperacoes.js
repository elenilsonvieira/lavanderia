import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class RoupaEmLavagemOperacoes extends React.Component {

    render(){
        return(
            <View style={styles.container}>
                <View style={[styles.unidadeContainer, this.props.styleExtra]}>
                    <View style={styles.lavagemInfoContainerCliente}>
                        <Text style={styles.lavagemInfoCliente}>{this.props.roupaEmLavagem.roupa.tipo}</Text>
                    </View>

                    <View style={styles.roupaContainer}>
                        <View style={styles.roupaInfoContainer}>
                            <Text style={styles.roupaInfoTitle}>Cores: </Text>
                            <Text style={styles.roupaInfo}>{this.props.roupaEmLavagem.roupa.cores}</Text>
                        </View>

                        <View style={styles.roupaInfoContainer}>
                            <Text style={styles.roupaInfoTitle}>Observação: </Text>
                            <Text style={styles.roupaInfo}>{this.props.roupaEmLavagem.roupa.observacao}</Text>
                        </View>

                        <View style={styles.roupaInfoContainer}>
                            <Text style={styles.roupaInfoTitle}>Marca: </Text>
                            <Text style={styles.roupaInfo}>{this.props.roupaEmLavagem.roupa.marca}</Text>
                        </View>

                        <View style={styles.roupaInfoContainer}>
                            <Text style={styles.roupaInfoTitle}>Tecido: </Text>
                            <Text style={styles.roupaInfo}>{this.props.roupaEmLavagem.roupa.tecido}</Text>
                        </View>

                        <View style={styles.roupaInfoContainer}>
                            <Text style={styles.roupaInfoTitle}>Tamanho: </Text>
                            <Text style={styles.roupaInfo}>{this.props.roupaEmLavagem.roupa.tamanho}</Text>
                        </View>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Quantidade: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.roupaEmLavagem.quantidade}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Observações: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.roupaEmLavagem.observacoes}</Text>
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