import React from 'react';
import {StyleSheet, View, ScrollView, Text, TouchableOpacity, Image, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OperacaoCelular from "../components/OperacaoCelular";
import LoadingModal from '../components/modals/LoadingModal';

export default class OperacoesTapeteScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Operações com Tapete',
        drawerIcon: ({ tintColor }) => (
            <Image
            source={require('../images/tapete_128x128.png')}
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
        Linking.openURL("http://sualavanderia.com.br/videos/OperacoesTapeteScreen.mp4");
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
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('OperacaoLavarTapete', {usuarioOid: this.state.usuarioOid})}>
                        <OperacaoCelular nome="Lavar" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('OperacaoProntoTapete', {usuarioOid: this.state.usuarioOid})}>
                        <OperacaoCelular nome="Pronto" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('OperacaoEntregarTapete', {usuarioOid: this.state.usuarioOid})}>
                        <OperacaoCelular nome="Entregar" />
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