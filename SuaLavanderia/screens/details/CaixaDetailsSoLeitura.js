import React from 'react';
import {StyleSheet, View, Text } from 'react-native';

import Caixa from '../../components/Caixa';

export default class CaixaDetailsSoleitura extends React.Component {

    state ={
        oid: '',
        conta: '',
        saldoInicial: '0',
        saldoAtual: '0',
        fechado: false,
        data: '',
        dataTimePickerVisible: false,
    };

    componentDidMount(){
        const objeto = this.props.navigation.getParam('objeto');

        if(objeto != null){
            const oid = objeto.oid;
            const saldoInicial = objeto.saldoInicial.toString();
            const saldoAtual = objeto.saldoAtual.toString();
            const conta = objeto.conta;
            const fechado = objeto.fechado;
            const data = objeto.data;

            this.setState({oid, saldoInicial, saldoAtual, conta, fechado, data});
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.infoTitle}>Caixa</Text>
                </View>

                <Caixa objeto={this.props.navigation.getParam('objeto')} />
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
            justifyContent: 'center',
            height: 40,
            backgroundColor: '#FFF',
            flexDirection: 'row',
          },
          objetoList: {
              paddingTop: 20,
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
            padding: 5,
        },
        boxDate:{
            backgroundColor: "#DDD",
            height: 40,
            borderRadius: 5,
            alignSelf: 'stretch',
            padding: 5,
            paddingTop: 10,
            justifyContent: 'center',
            fontSize: 15,
            fontWeight: 'bold',
        },
        buttonText: {
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
        infoTitle: {
            fontWeight: 'bold',
            paddingTop: 10,
        },
        movimentacaoInfo: {
        },
        button:{
            padding: 10,
        },
        icon: {
            width: 24,
            height: 24,
        },
    }
);