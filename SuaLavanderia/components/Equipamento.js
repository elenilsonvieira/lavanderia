import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Text from './Text';

export default class Equipamento extends React.Component {

    render(){
        var estiloDeAlerta = {};

        if(this.props.objeto.ativo && this.props.objeto.garantivaAtiva){
            estiloDeAlerta = styles.alertaVerde;
        }else if(this.props.objeto.ativo && !this.props.objeto.garantivaAtiva){
            estiloDeAlerta = styles.alertaAmarelo;
        }else if(!this.props.objeto.ativo){
            estiloDeAlerta = styles.alertaVermelho;
        }

        return(
            <View style={styles.container}>
                <View style={[styles.movimentacaoContainer, estiloDeAlerta]}>
                    <View style={styles.movimentacaoInfoContainerTitle}>
                        <Text style={styles.movimentacaoInfoTitle}>{this.props.objeto.tombamento}</Text>
                    </View>

                    <View style={styles.movimentacaoInfoContainer}>
                        {
                            this.props.showImage && this.props.objeto.linkDaImagem && 
                            <Image
                                resizeMethod='auto'
                                resizeMode='center'
                                style={styles.image}
                                source={{uri:this.props.objeto.linkDaImagem}}
                            />
                        }

                        <View style={styles.valorInfoContainer}>
                            <Text style={styles.valorInfoTitle}>Tipo: </Text>
                            <Text style={styles.movimentacaoInfo}>{this.props.objeto.tipo}</Text>
                        </View>

                        <View style={styles.valorInfoContainer}>
                            <Text style={styles.valorInfoTitle}>Fabricante: </Text>
                            <Text style={styles.movimentacaoInfo}>{this.props.objeto.fabricante}</Text>
                        </View>

                        <View style={styles.valorInfoContainer}>
                            <Text style={styles.valorInfoTitle}>Compra: </Text>
                            <Text style={styles.movimentacaoInfo}>{this.props.objeto.compra}</Text>
                        </View>

                        <View style={styles.valorInfoContainer}>
                            <Text style={styles.valorInfoTitle}>Garantia: </Text>
                            <Text style={styles.movimentacaoInfo}>{this.props.objeto.garantia}</Text>
                        </View>

                        <View style={styles.valorInfoContainer}>
                            <Text style={styles.valorInfoTitle}>Fim de Uso: </Text>
                            <Text style={styles.movimentacaoInfo}>{this.props.objeto.fimDeUso}</Text>
                        </View>

                        <View style={styles.valorInfoContainer}>
                            <Text style={styles.valorInfoTitle}>Fornecedor: </Text>
                            <Text style={styles.movimentacaoInfo}>{this.props.objeto.fornecedor}</Text>
                        </View>

                        <View style={styles.valorInfoContainer}>
                            <Text style={styles.valorInfoTitle}>Valor: </Text>
                            <Text style={styles.movimentacaoInfo}>{this.props.objeto.valor.toFixed(2)}</Text>
                        </View>

                        <View style={styles.valorInfoContainer}>
                            <Text style={styles.valorInfoTitle}>Observações: </Text>
                            <Text style={styles.movimentacaoInfo}>{this.props.objeto.observacoes}</Text>
                        </View>

                        <View style={styles.valorInfoContainer}>
                            <Text style={styles.valorInfoTitle}>Ativo? </Text>
                            <Text style={styles.movimentacaoInfo}>{this.props.objeto.ativo ? "Sim" : "Não"}</Text>
                        </View>

                        <View style={styles.valorInfoContainer}>
                            <Text style={styles.valorInfoTitle}>Garantia Ativa? </Text>
                            <Text style={styles.movimentacaoInfo}>{this.props.objeto.garantivaAtiva ? "Sim" : "Não"}</Text>
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
            fontSize: 25,
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
        alertaAmarelo: { 
            borderWidth: 10, 
            borderColor: 'yellow'
        },
        alertaVermelho: { 
            borderWidth: 10, 
            borderColor: 'red'
        },
        alertaVerde: { 
            borderWidth: 10, 
            borderColor: 'green'
        },
        image: {
            width: '100%',
            height: 200,
        },
    }
);