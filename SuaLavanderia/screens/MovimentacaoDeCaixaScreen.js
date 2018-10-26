import React from 'react';
import {StyleSheet, View, ScrollView, Image, Text, TextInput, TouchableOpacity } from 'react-native';

import MovimentacaoDeCaixa from "../components/MovimentacaoDeCaixa";

export default class MovimentacaoDeCaixaScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Movimentação de Caixa',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../images/pagamento_32x32.png')}
            style={styles.icon}
          />
        ),
      };

    state ={
        valor: '',
        objetos: [],
    };

    buscar = async () => {
        const call = await fetch('http://painel.sualavanderia.com.br/api/BuscarMovimentacaoDeCaixa.aspx?dataInicial=2018-10-24&dataFinal=2018-10-24&modo=saida');
        const response = await call.json();

        var objetos = [];

        for(index in response){
            const objetoResponse = response[index];

            const objeto = {
                oid: '',//objetoResponse.Oid,
                dataDaUltimaAlteracao: objetoResponse.DataDaUltimaAlteracao,
                data: objetoResponse.Data,
                modo: objetoResponse.Modo,
                capital: objetoResponse.Capital,
                tipo: objetoResponse.Tipo,
                valor: objetoResponse.Valor,
                observacoes: objetoResponse.Observacoes,
                status: objetoResponse.Status,
                responsavel: objetoResponse.Responsavel,
                conferidor: objetoResponse.Conferidor,
                lavagem: objetoResponse.Lavagem,
            };    

            objetos = [...objetos, objeto];
        }

        this.setState({objetos});
    };

    filtrar =  () => {        
        if(this.state.valor.trim() !== '') {
            var objetos = [];

            this.state.objetos.map(objeto => {
                if(objeto.valor.toString().includes(this.state.valor)){ 
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
                        placeholder='Valor'
                        value={this.state.valor}
                        autoFocus
                        onChangeText={valor => this.setState({valor})} 
                    />

                    <TouchableOpacity onPress={this.filtrar} style={styles.button}>
                        <Text style={styles.buttonText}>Filtrar</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.objetoList}>
                    {this.state.objetos.map(objeto => 
                        <TouchableOpacity key={objeto.oid} onPress={() => this.props.navigation.navigate('MovimentacaoDeCaixaDetails', {movimentacao: objeto})}>
                            <MovimentacaoDeCaixa key={objeto.oid} movimentacao={objeto} />
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