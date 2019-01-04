import React from 'react';
import {StyleSheet, Text, View, TextInput } from 'react-native';

export default class Roupa extends React.Component {

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.roupaContainer}>
                    <View style={styles.roupaInfoContainer}>
                        <Text style={styles.roupaInfoTitle}>Chave: </Text>
                        <Text style={styles.roupaInfo}>{this.props.roupa.chave}</Text>
                    </View>

                    <View style={styles.roupaInfoContainer}>
                        <Text style={styles.roupaInfoTitle}>Cliente: </Text>
                        <Text style={styles.roupaInfo}>{this.props.roupa.cliente}</Text>
                    </View>

                    <View style={styles.roupaInfoContainer}>
                        <Text style={styles.roupaInfoTitle}>Tipo: </Text>
                        <Text style={styles.roupaInfo}>{this.props.roupa.tipo}</Text>
                    </View>

                    <View style={styles.roupaInfoContainer}>
                        <Text style={styles.roupaInfoTitle}>Tecido: </Text>
                        <Text style={styles.roupaInfo}>{this.props.roupa.tecido}</Text>
                    </View>

                    <View style={styles.roupaInfoContainer}>
                        <Text style={styles.roupaInfoTitle}>Tamanho: </Text>
                        <Text style={styles.roupaInfo}>{this.props.roupa.tamanho}</Text>
                    </View>

                    <View style={styles.roupaInfoContainer}>
                        <Text style={styles.roupaInfoTitle}>Marca: </Text>
                        <Text style={styles.roupaInfo}>{this.props.roupa.marca}</Text>
                    </View>

                    <View style={styles.roupaInfoContainer}>
                        <Text style={styles.roupaInfoTitle}>Cores: </Text>
                        <Text style={styles.roupaInfo}>{this.props.roupa.cores}</Text>
                    </View>

                    <View style={styles.roupaInfoContainer}>
                        <Text style={styles.roupaInfoTitle}>Código: </Text>
                        <Text style={styles.roupaInfo}>{this.props.roupa.codigo}</Text>
                    </View>

                    <View style={styles.roupaInfoContainer}>
                        <Text style={styles.roupaInfoTitle}>Observação: </Text>
                        <Text style={styles.roupaInfo}>{this.props.roupa.observacao}</Text>
                    </View>

                    <View style={styles.roupaInfoContainer}>
                        <Text style={styles.roupaInfoTitle}>Última Lavagem: </Text>
                        <Text style={styles.roupaInfo}>{this.props.roupa.ultimaLavagem}</Text>
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
        roupaContainer: {
            borderRadius: 5,
            backgroundColor: '#FFF',
            padding: 20,
            margin: 20,
            justifyContent: 'center',
        },
        roupaInfoContainer: {
            flexDirection: 'row',
        },
        roupaInfoTitle: {
            fontWeight: 'bold',
        },
        roupaInfo: {
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