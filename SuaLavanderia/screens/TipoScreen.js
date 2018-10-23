import React from 'react';
import {StyleSheet, View, ScrollView, Image, Text, TextInput, TouchableOpacity } from 'react-native';

import Tipo from "../components/Tipo";

export default class TipoScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Tipo',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../images/tipo-de-roupa_32x32.png')}
            style={styles.icon}
          />
        ),
      };

    state ={
        nome: '',
        tipos: [],
    };

    buscar = async () => {
        const call = await fetch('http://painel.sualavanderia.com.br/api/BuscarTipo.aspx');
        const response = await call.json();

        var tipos = [];

        for(index in response){
            const tipoResponse = response[index];

            const tipo = {
                oid: tipoResponse.Oid,
                nome: tipoResponse.Nome,
                valor: tipoResponse.Valor,
            };    

            tipos = [...tipos, tipo];
        }

        this.setState({tipos});
    };

    filtrar =  () => {
        var tipos = [];

        this.state.tipos.map(tipo => {
            if(tipo.nome.includes(this.state.nome)){ 
                tipos = [...tipos, tipo];
            }
        });

        for(index in this.sta){
            const tipoResponse = response[index];

            const tipo = {
                oid: tipoResponse.Oid,
                nome: tipoResponse.Nome,
                valor: tipoResponse.Valor,
            };    

            tipos = [...tipos, tipo];
        }

        this.setState({tipos});
    };

    async componentDidMount(){
        const tipos = await this.buscar() || [];
        this.setState(tipos);
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

                <ScrollView contentContainerStyle={styles.tipoList}>
                    {this.state.tipos.map(tipo => 
                        <Tipo key={tipo.oid} tipo={tipo} />
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
          tipoList: {
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