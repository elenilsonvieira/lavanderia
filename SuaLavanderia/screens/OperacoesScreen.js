import React from 'react';
import {StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';

import Operacao from "../components/Operacao";
import LoadingModal from '../components/modals/LoadingModal';

export default class OperacoesScreen extends React.Component {

    state ={
        modalVisible: false,
        usuarioOid: '',
    };

    componentDidMount(){
        const usuarioOid = this.props.navigation.getParam("usuarioOid");
        this.setState({usuarioOid});
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                  <Text style={styles.infoTitle}>O que deseja fazer?</Text>
                </View>

                <ScrollView contentContainerStyle={styles.objetoList}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('OperacaoLavar', {usuarioOid: this.state.usuarioOid})}>
                        <Operacao nome="Lavar" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('OperacaoRecolher', {usuarioOid: this.state.usuarioOid})}>
                        <Operacao nome="Recolher do Varal" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('OperacaoPassar', {usuarioOid: this.state.usuarioOid})}>
                        <Operacao nome="Passar" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('OperacaoEmpacotar', {usuarioOid: this.state.usuarioOid})}>
                        <Operacao nome="Empacotar" />
                    </TouchableOpacity>
                </ScrollView>

                <LoadingModal modalVisible={this.state.modalVisible} />
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
          objetoList: {
              paddingTop: 20,
          },
          header:{
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FFF',
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
            width: 250,
            padding: 5,
        },
        buttonText: {
            fontWeight: 'bold',
        },
        button:{
            margin: 10,
        },
        viewHeader: {
            flexDirection: 'row',
        },
        viewHeaderSegundaLinha: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        boxDate:{
            height: 40,
            borderRadius: 5,
            padding: 5,
            paddingTop: 10,
            justifyContent: 'center',
            fontSize: 15,
            fontWeight: 'bold',
        },
        picker:{
            height: 40,
            width: 150,
            borderRadius: 15,
            padding: 5,
        },
        infoTitle: {
            fontWeight: 'bold',
            margin: 10,
        },
        viewBotao: {
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
    }
);