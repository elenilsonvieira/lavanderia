import React from 'react';
import {StyleSheet, View, ScrollView, Image } from 'react-native';

import Unidade from "../components/Unidade";

export default class RoupaScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Unidade',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../images/ponto-de-coleta_32x32.png')}
            style={styles.icon}
          />
        ),
      };

    state ={
        unidades: [],
    };

    buscar = async () => {
        const call = await fetch('http://painel.sualavanderia.com.br/api/BuscarUnidade.aspx');
        const response = await call.json();

        var unidades = [];

        for(index in response){
            const unidadeResponse = response[index];

            const unidade = {
                oid: unidadeResponse.Oid,
                nome: unidadeResponse.Nome,
                endereco: unidadeResponse.Endereco,
                telefoneCelular: unidadeResponse.TelefoneMovel,
                telefoneFixo: unidadeResponse.TelefoneConvencional,
            };    

            unidades = [...unidades, unidade];
        }

        this.setState({unidades});
    };

    async componentDidMount(){
        const unidades = await this.buscar() || [];
        this.setState(unidades);
    }

    render(){
        return(
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.unidadeList}>
                    {this.state.unidades.map(unidade => 
                        <Unidade key={unidade.oid} unidade={unidade} />
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
          unidadeList: {
              paddingTop: 20,
          },
    }
);