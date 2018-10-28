import React from 'react';
import {StyleSheet, View, Picker, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import Roupa from '../../components/Roupa';

export default class RoupaEmLavagemDetails extends React.Component {

    state ={
        quantidade: '1',
        soPassar:  '0',
        observacoes: '',
        chave: '',
        roupa: {},
    };

    componentDidMount(){
        var roupaEmLavagem = this.props.navigation.getParam('roupaEmLavagem');

        if(roupaEmLavagem != null){
            const quantidade = roupaEmLavagem.quantidade.toString();
            const soPassar = roupaEmLavagem.soPassar ? '1' : '0';
            const observacoes = roupaEmLavagem.observacoes;
            const chave = roupaEmLavagem.roupa.chave;
            const roupa = roupaEmLavagem.roupa;

            this.setState({quantidade, soPassar, observacoes, chave, roupa});
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.button}>
                        <Image style={styles.icon} source={require('../../images/salvar_32x32.png')} />
                    </TouchableOpacity>
                </View>

                <View style={styles.unidadeContainer}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoTitle}>Quantidade: </Text>
                            <TextInput
                                style={styles.boxInput}
                                autoFocus
                                value={this.state.quantidade}
                                onChangeText={quantidade => this.setState({quantidade})}
                            />
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.infoTitlePicker}>Só Passar?: </Text>
                        <Picker
                            style={styles.picker}
                            selectecValue={this.state.soPassar}
                            onValueChange={(itemValue, itemIndex) => this.setState({soPassar: itemValue})}>
                            <Picker.Item label='Não' value='0' />
                            <Picker.Item label='Sim' value='1' />
                        </Picker>
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.infoTitle}>Observações: </Text>
                        <TextInput
                            style={styles.boxInput}
                            value={this.state.observacoes}
                            onChangeText={observacoes => this.setState({observacoes})}
                        />
                    </View>

                    <View style={styles.roupasContainer}>
                        <Text style={styles.roupasTitle}>Roupa</Text>
                    </View>

                    <View style={styles.infoContainer}>
                        <TextInput
                            style={styles.boxInput}
                            value={this.state.chave}
                            placeholder='Chave'
                            onChangeText={chave => this.setState({chave})}
                        />
                        <TouchableOpacity onPress={() => {}} style={styles.button}>
                            <Image style={styles.icon} source={require('../../images/pesquisar_32x32.png')} />
                        </TouchableOpacity>
                    </View>

                    <Roupa roupa={this.state.roupa} />
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
            padding: 5,
            width: 170,
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
        infoContainer: {
            flexDirection: 'row',
        },
        lavagemInfoContainerCliente: {
            alignItems: 'center',
        },
        infoTitle: {
            fontWeight: 'bold',
            margin: 10,
        },
        infoTitlePicker: {
            fontWeight: 'bold',
            margin: 10,
            paddingTop: 10,
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
        picker:{
            height: 40,
            width: 100,
            borderRadius: 15,
            padding: 5,
            margin: 10,
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