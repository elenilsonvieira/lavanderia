import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';

import Roupa from "../components/Roupa";

export default class RoupaScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Roupa',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../images/roupa_32x32.png')}
            style={styles.icon}
          />
        ),
      };

    state ={
        chave: '',
        roupa: {
            tipo: '',
            tecido: '',
            tamanho: '',
            marca: '',
            observacao: '',
            codigo: '',
            cliente: '',
            clienteOid: '',
            chave: '',
        },
    };

    novaRoupa = () => {
        var roupa = {
            tipo: '',
            tecido: '',
            tamanho: '',
            marca: '',
            observacao: '',
            codigo: '',
            cliente: '',
            clienteOid: '',
            chave: '',
        };

        return roupa;
    };

    buscar = async () => {
        const roupaCall = await fetch(`http://painel.sualavanderia.com.br/api/BuscarRoupa.aspx?oid=${this.state.chave}`);

        const response = await roupaCall.json();
        var roupaResponse = response[0];

        const roupa = {
            tipo: roupaResponse.Tipo,
            tecido: roupaResponse.Tecido,
            tamanho: roupaResponse.Tamanho,
            marca: roupaResponse.Marca,
            observacao: roupaResponse.Observacao,
            codigo: roupaResponse.Codigo,
            chave: roupaResponse.Chave,
            cliente: roupaResponse.Cliente,
            clienteOid: roupaResponse.ClienteOid,
        };

        this.setState({roupa});
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <TextInput
                        style={styles.boxInput} 
                        placeholder='Chave'
                        value={this.state.chave}
                        autoFocus
                        onChangeText={chave => this.setState({chave})} 
                    />

                    <TouchableOpacity onPress={this.buscar} style={styles.button}>
                        <Text style={styles.buttonText}>Buscar</Text>
                    </TouchableOpacity>
                </View>

                <Roupa roupa={this.state.roupa} />
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
            width: 250,
            padding: 5,
        },
        buttonText: {
            fontWeight: 'bold',
        },
        roupaContainer: {
            borderRadius: 5,
            backgroundColor: '#FFF',
            padding: 20,
            margin: 20,
            justifyContent: 'center',
        },
        roupaInfoContainer: {
            flexDirection: 'row',
        },
        roupaInfoTitle: {
            fontWeight: 'bold',
        },
        roupaInfo: {
        },
        button:{
            padding: 10,
        },
        icon: {
            width: 24,
            height: 24,
        }
    }
);