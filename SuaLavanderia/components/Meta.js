import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from './Text';

export default class Meta extends React.Component {

    render(){
        var estiloDeAlerta = {};

        if(this.props.objeto.alertaAmarelo){
            estiloDeAlerta = styles.alertaAmarelo;
        }else if(this.props.objeto.alertaVerde){
            estiloDeAlerta = styles.alertaVerde;
        }else if(this.props.objeto.alertaVermelho){
            estiloDeAlerta = styles.alertaVermelho;
        }else if(this.props.objeto.alertaCinza){
            estiloDeAlerta = styles.alertaCinza;
        } 

        return(
            <View style={styles.container}>
                <View style={[styles.movimentacaoContainer, estiloDeAlerta]}>
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
        },alertaAmarelo: { 
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
        },alertaCinza: { 
            borderWidth: 10, 
            borderColor: 'gray'
        }
    }
);