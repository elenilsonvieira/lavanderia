import React from 'react';
import {StyleSheet, View, ScrollView, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import RoupaEmLavagem from '../../components/RoupaEmLavagem';

export default class LavagemDetails extends React.Component {

    state ={
        nome: '',
        modalVisible: false,
    };

    navegarParaDetalhes(props, roupaEmLavagem){
        const lavagem = this.props.navigation.getParam('lavagem');

        if(lavagem.status == 'Anotada'){
            props.navigation.navigate('RoupaEmLavagemDetails', {roupaEmLavagem: roupaEmLavagem});
        }else {
            alert('Essa lavagem já está anotada.');
        }
    }

    render(){
        const lavagem = this.props.navigation.getParam('lavagem');

        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('RoupaEmLavagemDetails')} style={styles.button}>
                        <Image style={styles.icon} source={require('../../images/adicionar_32x32.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.button}>
                        <Image style={styles.icon} source={require('../../images/salvar_32x32.png')} />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.unidadeContainer}>
                        <View style={styles.lavagemInfoContainerCliente}>
                            <Text style={styles.lavagemInfoCliente}>{lavagem.cliente}</Text>
                        </View>

                        <View style={styles.lavagemInfoContainer}>
                            <Text style={styles.lavagemInfoTitle}>Oid: </Text>
                            <Text style={styles.lavagemInfo}>{lavagem.oid}</Text>
                        </View>

                        <View style={styles.lavagemInfoContainer}>
                            <Text style={styles.lavagemInfoTitle}>Unidade: </Text>
                            <Text style={styles.lavagemInfo}>{lavagem.unidadeDeRecebimento}</Text>
                        </View>

                        <View style={styles.lavagemInfoContainer}>
                            <Text style={styles.lavagemInfoTitle}>Data de Recebimento: </Text>
                            <Text style={styles.lavagemInfo}>{lavagem.dataDeRecebimento}</Text>
                        </View>

                        <View style={styles.lavagemInfoContainer}>
                            <Text style={styles.lavagemInfoTitle}>Data Preferível para Entrega: </Text>
                            <Text style={styles.lavagemInfo}>{lavagem.dataPreferivelParaEntrega}</Text>
                        </View>

                        <View style={styles.lavagemInfoContainer}>
                            <Text style={styles.lavagemInfoTitle}>Data de Entrega: </Text>
                            <Text style={styles.lavagemInfo}>{lavagem.dataDeEntrega}</Text>
                        </View>

                        <View style={styles.lavagemInfoContainer}>
                            <Text style={styles.lavagemInfoTitle}>Status: </Text>
                            <Text style={styles.lavagemInfo}>{lavagem.status}</Text>
                        </View>

                        <View style={styles.lavagemInfoContainer}>
                            <Text style={styles.lavagemInfoTitle}>Paga: </Text>
                            <Text style={styles.lavagemInfo}>{lavagem.paga}</Text>
                        </View>
                    </View>

                    <View style={styles.roupasContainer}>
                        <Text style={styles.roupasTitle}>Roupas</Text>
                    </View>
                    
                    { lavagem.roupas.map(roupaEmLavagem => 
                        <TouchableOpacity key={roupaEmLavagem.roupa.oid} onPress={() => this.navegarParaDetalhes(this.props, roupaEmLavagem)}>
                            <RoupaEmLavagem roupaEmLavagem={roupaEmLavagem} />
                        </TouchableOpacity>
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
            alignItems: 'center',
            justifyContent: 'flex-end',
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
            padding: 10,
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
            margin: 10,
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
    }
);