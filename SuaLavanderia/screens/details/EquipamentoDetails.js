import React from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView, Linking, Image } from 'react-native';

import ManutencaoEmEquipamento from '../../components/ManutencaoEmEquipamento';
import Text from '../../components/Text';
import Equipamento from '../../components/Equipamento';

export default class EquipamentoDetails extends React.Component {

    state ={
        objeto: null,
        manutencoes: [],
    };

    componentDidMount(){
        const objeto = this.props.route.params.objeto;

        if(objeto != null){
            const manutencoes = objeto.manutencoes;
            this.setState({objeto, manutencoes});
        }
    }

    openVideoInformativo = () => {
        //Linking.openURL("http://sualavanderia.com.br/videos/CaixaDetailsSoLeitura.mp4");
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.infoTitle}>Equipamento</Text>
                    <View style={styles.viewBotao}>
                        <TouchableOpacity onPress={this.openVideoInformativo} style={styles.button}>
                            <Image style={styles.icon} source={require('../../images/pergunta_32x32.png')} />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView>
                    <Equipamento showImage={true} objeto={this.state.objeto ? this.state.objeto : this.props.route.params.objeto} />

                    <View style={styles.roupasContainer}>
                        <Text style={styles.roupasTitle}>Manutenções</Text>
                    </View>
                    
                    { 
                        this.state.manutencoes.map(item => 
                        <ManutencaoEmEquipamento objeto={item} />
                    )}
                </ScrollView>
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
        roupasContainer: {
            alignItems: 'center',
            backgroundColor: '#F8F8F8',
            borderRadius: 5, 
            marginLeft: 20,
            marginRight: 20,
        },
        roupasTitle: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        viewBotao: {
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
    }
);