import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from './Text';

export default class Tipo extends React.Component {

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.tipoContainer}>
                    <View style={styles.tipoInfoContainer}>
                        <Text style={styles.tipoInfoTitle}>{this.props.tipo.nome}</Text>

                        <View style={styles.valorInfoContainer}>
                            <Text style={styles.valorInfoTitle}>Valor: </Text>
                            <Text style={styles.tipoInfo}>R$ {this.props.tipo.valor}</Text>
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
        tipoContainer: {
            borderRadius: 5,
            backgroundColor: '#FFF',
            padding: 20,
            margin: 20,
            justifyContent: 'center',
        },
        tipoInfoContainer: {
            alignItems: 'center',
        },
        valorInfoContainer: {
            flexDirection: 'row',
        },
        tipoInfoTitle: {
            fontSize: 25,
            fontWeight: 'bold',
        },
        valorInfoTitle: {
            fontWeight: 'bold',
        },
        tipoInfo: {
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