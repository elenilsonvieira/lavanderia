import React from 'react';
import {StyleSheet, View, ScrollView, Image, Text, TextInput, TouchableOpacity } from 'react-native';

import ItemDeCompra from "../components/ItemDeCompra";
import LoadingModal from '../components/modals/LoadingModal';
import fetch from '../utils/FetchWithTimeout';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ListaDeComprasScreen extends React.Component {

    state ={
        objetos: [],
        dataDaCompra: '',
        duracaoDoEstoque: '',
        modalVisible: false,
        confirmacaoModalVisible: false,
        listaDeComprasModalVisible: false,
    };

    dataString = () => {
        var data = new Date();
        
        var dia = data.getDate();
        var mes = data.getMonth() + 1;
    
        if(dia < 10){
            dia = '0' + dia;
        }
    
        if(mes < 10){
            mes = '0' + mes;
        }
    
        return data.getFullYear() + '' + mes + '' + dia;
    };
    
    hash = (usuario) => {        
        var dataString = this.dataString();
        var md5 = require('md5');
    
        var hashDaSenha = usuario.hashDaSenha;
        var hashDaData = md5(dataString);
    
        var hash = md5(hashDaSenha + ':' + hashDaData);
    
        return hash;
    };
    
    getUser = async () => {
        var usuario;
    
        try{
          usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));
        }catch(exception){}
    
        return usuario;
    };

    buscar = async () => {
        this.setState({modalVisible: true});

        var usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));
        var hash = this.hash(usuario);
        var email = usuario.email;

        var dataDaCompra = this.props.route.params.dataDaCompra;
        var dataDaCompraArray = dataDaCompra.split('/');
        var data = dataDaCompraArray[2] + '-'+ dataDaCompraArray[1] + '-' + dataDaCompraArray[0];

        var argumentos = `data=${data}`;

        try{
            const call = await fetch(`http://painel.sualavanderia.com.br/api/BuscarListaDeCompras.aspx?${argumentos}&login=${email}&senha=${hash}`, 
                { 
                    method: 'post' 
                });
            const response = await call.json();

            for(index in response){
                const objetoResponse = response[index];
                var objetos = [];    

                var dataDaCompra = objetoResponse.DataDaCompra;
                var duracaoDoEstoque = objetoResponse.DuracaoDoEstoque;

                for(indexItem in objetoResponse.Itens){
                    const itemResponse = objetoResponse.Itens[indexItem];

                    const objeto = {
                        quantidadeASerComprada: itemResponse.QuantidadeASerComprada,
                        dataDaCompra: itemResponse.DataDaCompra,
                        material: {
                            oid: itemResponse.Material.Oid,
                            nome: itemResponse.Material.Nome,
                            detalhes: itemResponse.Material.Detalhes,
                            precoBase: itemResponse.Material.PrecoBase,
                            fornecedor: {
                                oid: itemResponse.Material.Fornecedor.Oid,
                                tipo: itemResponse.Material.Fornecedor.Tipo,
                                nome: itemResponse.Material.Fornecedor.Nome,
                                tipo: itemResponse.Material.Fornecedor.Tipo,
                                cpfCnpj: itemResponse.Material.Fornecedor.CpfCnpj,
                                telefone: itemResponse.Material.Fornecedor.Telefone,
                                endereco: itemResponse.Material.Fornecedor.Endereco,
                            },
                            estoque: itemResponse.Material.Estoque,
                            minimoEmEstoque: itemResponse.Material.MinimoEmEstoque,
                            mediaDeDiasDeUmaUnidade: itemResponse.Material.MediaDeDiasDeUmaUnidade,
                            proximaCompra: itemResponse.Material.ProximaCompra,
                            ultimaMovimentacao: itemResponse.Material.UltimaMovimentacao,
                            ativo: itemResponse.Material.Ativo,
                            alertaAmarelo: itemResponse.Material.AlertaAmarelo,
                            alertaVermelho: itemResponse.Material.AlertaVermelho,
                            movimentacoes: [],
                        },    
                    };

                    objetos = [...objetos, objeto];
                }
            }

            this.setState({objetos, dataDaCompra, duracaoDoEstoque});
        }catch(erro){
            alert('Erro.' + erro);
        }

        this.setState({modalVisible: false});
    };

    async componentDidMount(){
        const objetos = await this.buscar() || [];
        this.setState(objetos);
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.infoTitle}>Lista de Compras</Text>
                </View>

                <ScrollView contentContainerStyle={styles.objetoList}>
                    <View style={styles.unidadeContainer}>
                        <View style={styles.lavagemInfoContainer}>
                            <Text style={styles.lavagemInfoTitle}>Data da Compra: </Text>
                            <Text style={styles.lavagemInfo}>{this.state.dataDaCompra}</Text>
                        </View>

                        <View style={styles.lavagemInfoContainer}>
                            <Text style={styles.lavagemInfoTitle}>Duração do Estoque: </Text>
                            <Text style={styles.lavagemInfo}>{this.state.duracaoDoEstoque}</Text>
                        </View>
                    </View>

                    <View style={styles.roupasContainer}>
                        <Text style={styles.roupasTitle}>Itens</Text>
                    </View>

                    {this.state.objetos.map(objeto => 
                        <ItemDeCompra key={objeto.material.oid} objeto={objeto} />
                    )}
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
        unidadeContainer: {
            borderRadius: 5,
            backgroundColor: '#FFF',
            padding: 5,
            margin: 10,
            justifyContent: 'center',
        },
        lavagemInfoContainer: {
            marginTop: 5,
            flexDirection: 'row',
        },
        lavagemInfoTitle: {
            fontWeight: 'bold',
            fontSize: 20,
        },
        lavagemInfo: {
            fontSize: 20,
        },
        roupasContainer: {
            alignItems: 'center',
            backgroundColor: '#F8F8F8',
            borderRadius: 5, 
            marginLeft: 20,
            marginRight: 20,
        },
    }
);