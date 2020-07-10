import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Material extends React.Component {

    render(){
        var fornecedor = null;

        if(this.props.material.fornecedor){
            fornecedor = this.props.material.fornecedor.nome + ' | ' + this.props.material.fornecedor.telefone;
        }

        var estiloDeAlerta = {};

        if(this.props.material.alertaAmarelo){
            estiloDeAlerta = styles.alertaAmarelo;
        } else if(this.props.material.alertaVermelho){
            estiloDeAlerta = styles.alertaVermelho;
        }

        return(
            <View style={styles.container}>
                <View style={[styles.unidadeContainer, estiloDeAlerta]}>
                    <View style={styles.lavagemInfoContainerCliente}>
                        <Text style={styles.lavagemInfoCliente}>{this.props.material.nome}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Estoque: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.material.estoque}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Mínimo em Estoque: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.material.minimoEmEstoque}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Detalhes: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.material.detalhes}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Média de dias de uma unidade: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.material.mediaDeDiasDeUmaUnidade}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Próxima Compra: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.material.proximaCompra}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Última Movimentação: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.material.ultimaMovimentacao}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Fornecedor: </Text>
                        <Text style={styles.lavagemInfo}>{fornecedor}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Preço Base: </Text>
                        <Text style={styles.lavagemInfo}>R$ {this.props.material.precoBase}</Text>
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
        }
    }
);