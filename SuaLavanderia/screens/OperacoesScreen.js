import React from 'react';
import {StyleSheet, View, ScrollView, Text, TouchableOpacity, Image, Linking } from 'react-native';

import Operacao from "../components/Operacao";
import LoadingModal from '../components/modals/LoadingModal';

export default class OperacoesScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Operações',
        drawerIcon: ({ tintColor }) => (
            <Image
            source={require('../images/roupa-dobrada_32x32.png')}
            style={styles.icon}
            />
        ),
    };

    state ={
        modalVisible: false,
        usuarioOid: '',
    };

    async componentDidMount(){
        var usuarioOid = this.props.navigation.getParam("usuarioOid");

        if(!usuarioOid){
            usuarioOid = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario")).oid;
        }

        this.setState({usuarioOid});
    }

    openVideoInformativo = () => {
        Linking.openURL("http://sualavanderia.com.br/videos/OperacoesScreen.mp4");
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.infoTitle}>O que deseja fazer?</Text>
                    <View style={styles.viewBotao}>
                        <TouchableOpacity onPress={this.openVideoInformativo} style={styles.button}>
                            <Image style={styles.icon} source={require('../images/pergunta_32x32.png')} />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.objetoList}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('OperacaoLavar', {usuarioOid: this.state.usuarioOid})}>
                        <Operacao nome="1 - Lavar" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('OperacaoRecolher', {usuarioOid: this.state.usuarioOid})}>
                        <Operacao nome="2 - Recolher do Varal" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('OperacaoPassar', {usuarioOid: this.state.usuarioOid})}>
                        <Operacao nome="3 - Passar" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('OperacaoEmpacotar', {usuarioOid: this.state.usuarioOid})}>
                        <Operacao nome="4 - Empacotar" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('OperacaoListaDeEntrega', {usuarioOid: this.state.usuarioOid})}>
                        <Operacao nome="5 - Lista de Entrega" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('OperacaoRetirarMaterial', {usuarioOid: this.state.usuarioOid})}>
                        <Operacao nome="6 - Retirar Material" />
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
            justifyContent: 'center',
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
        icon: {
            width: 24,
            height: 24,
        },
    }
);