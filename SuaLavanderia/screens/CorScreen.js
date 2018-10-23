import React from 'react';
import {StyleSheet, View, ScrollView, Image, Text, TextInput, TouchableOpacity } from 'react-native';

import Cor from "../components/Cor";

export default class CorScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Cor',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../images/cor_32x32.png')}
            style={styles.icon}
          />
        ),
      };

    state ={
        nome: '',
        objetos: [],
    };

    buscar = async () => {
        const call = await fetch('http://painel.sualavanderia.com.br/api/BuscarCor.aspx');
        const response = await call.json();

        var objetos = [];

        for(index in response){
            const objetoResponse = response[index];

            const objeto = {
                oid: objetoResponse.Oid,
                nome: objetoResponse.Nome,
                valor: objetoResponse.Valor,
            };    

            objetos = [...objetos, objeto];
        }

        this.setState({objetos});
    };

    filtrar =  () => {
        this.buscar();

        if(this.state.nome.trim() !== '') {
            var objetos = [];

            this.state.objetos.map(objeto => {
                if(objeto.nome.toLowerCase().includes(this.state.nome.toLowerCase())){ 
                    objetos = [...objetos, objeto];
                }
            });

            this.setState({objetos});
        }
    };

    async componentDidMount(){
        const objetos = await this.buscar() || [];
        this.setState(objetos);
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <TextInput
                        style={styles.boxInput} 
                        placeholder='Nome'
                        value={this.state.nome}
                        autoFocus
                        onChangeText={nome => this.setState({nome})} 
                    />

                    <TouchableOpacity onPress={this.filtrar} style={styles.button}>
                        <Text style={styles.buttonText}>Filtrar</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.objetoList}>
                    {this.state.objetos.map(objeto => 
                        <Cor key={objeto.oid} cor={objeto} />
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
          objetoList: {
              paddingTop: 20,
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
        button:{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            margin: 10,
            padding: 10,
            backgroundColor: '#DDD',
        },
    }
);