import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from './Text';

export default class ItemDeCompra extends React.Component {

    render(){
        var fornecedor = null;
        var enderecoDoFornecedor = null;

        if(this.props.objeto.material.fornecedor){
            fornecedor = this.props.objeto.material.fornecedor.nome + ' | ' + this.props.objeto.material.fornecedor.telefone;
            enderecoDoFornecedor = this.props.objeto.material.fornecedor.endereco;
        }

        var estiloDeAlerta = {};

        if(this.props.objeto.material.alertaAmarelo){
            estiloDeAlerta = styles.alertaAmarelo;
        } else if(this.props.objeto.material.alertaVermelho){
            estiloDeAlerta = styles.alertaVermelho;
        }

        return(
            <View style={styles.container}>
                <View style={[styles.unidadeContainer, estiloDeAlerta]}>
                    <View style={styles.lavagemInfoContainerCliente}>
                        <Text style={styles.lavagemInfoCliente}>{this.props.objeto.material.nome} 
                             {' - ' + this.props.objeto.quantidadeASerComprada + ' und'}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Detalhes: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.objeto.material.detalhes}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Preço Base: </Text>
                        <Text style={styles.lavagemInfo}>R$ {this.props.objeto.material.precoBase}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Fornecedor: </Text>
                        <Text style={styles.lavagemInfo}>{fornecedor}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Endereço: </Text>
                        <Text style={styles.lavagemInfo}>{enderecoDoFornecedor}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Estoque: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.objeto.material.estoque}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Mínimo em Estoque: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.objeto.material.minimoEmEstoque}</Text>
                    </View>

                    <View style={styles.lavagemInfoContainer}>
                        <Text style={styles.lavagemInfoTitle}>Fim de Estoque: </Text>
                        <Text style={styles.lavagemInfo}>{this.props.objeto.dataDaCompra}</Text>
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