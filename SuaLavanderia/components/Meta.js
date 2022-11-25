import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Meta extends React.Component {

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.movimentacaoContainer}>
                    <View style={styles.movimentacaoInfoContainerTitle}>
                        <Text style={styles.movimentacaoInfoTitle}>{this.props.objeto.descricao}</Text>
                    </View>

                    <View style={styles.movimentacaoInfoContainer}>
                        <View style={styles.valorInfoContainer}>
                            <Text style={styles.valorInfoTitle}>Prazo: </Text>
                            <Text style={styles.movimentacaoInfo}>{this.props.objeto.inicio} a {this.props.objeto.fim}</Text>
                        </View>

                        <View style={styles.valorInfoContainer}>
                            <Text style={styles.valorInfoTitle}>Valor: </Text>
                            <Text style={styles.movimentacaoInfo}>{this.props.objeto.valor}</Text>
                        </View>

                        <View style={styles.valorInfoContainer}>
                            <Text style={styles.valorInfoTitle}>Valor Alcançado: </Text>
                            <Text style={styles.movimentacaoInfo}>{this.props.objeto.valorAlcancado}</Text>
                        </View>

                        <View style={styles.valorInfoContainer}>
                            <Text style={styles.valorInfoTitle}>Responsável: </Text>
                            <Text style={styles.movimentacaoInfo}>{this.props.objeto.responsavel}</Text>
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
        movimentacaoContainer: {
            borderRadius: 5,
            backgroundColor: '#FFF',
            padding: 20,
            margin: 20,
            justifyContent: 'center',
        },
        movimentacaoInfoContainer: {
        },
        movimentacaoInfoContainerTitle: {
            alignItems: 'center',
        },
        valorInfoContainer: {
            flexDirection: 'row',
        },
        movimentacaoInfoTitle: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        valorInfoTitle: {
            fontWeight: 'bold',
        },
        movimentacaoInfo: {
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