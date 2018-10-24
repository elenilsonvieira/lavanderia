import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Unidade extends React.Component {

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.unidadeContainer}>
                    <View style={styles.unidadeInfoContainerNome}>
                        <Text style={styles.unidadeInfoNome}>{this.props.unidade.nome}</Text>
                    </View>

                    <View style={styles.unidadeInfoContainer}>
                        <Text style={styles.unidadeInfoTitle}>Celular: </Text>
                        <Text style={styles.unidadeInfo}>{this.props.unidade.telefoneCelular}</Text>
                    </View>

                    <View style={styles.unidadeInfoContainer}>
                        <Text style={styles.unidadeInfoTitle}>Fixo: </Text>
                        <Text style={styles.unidadeInfo}>{this.props.unidade.telefoneFixo}</Text>
                    </View>

                    <View style={styles.unidadeInfoContainer}>
                        <Text style={styles.unidadeInfoTitle}>Endereço: </Text>
                        <Text style={styles.unidadeInfo}>{this.props.unidade.endereco}</Text>
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
        unidadeInfoContainer: {
            flexDirection: 'row',
        },
        unidadeInfoContainerNome: {
            alignItems: 'center',
        },
        unidadeInfoTitle: {
            fontWeight: 'bold',
        },
        unidadeInfo: {
        },
        unidadeInfoNome: {
            fontWeight: 'bold',
            fontSize: 25,
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