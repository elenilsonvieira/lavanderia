import React from 'react';
import {StyleSheet, View, ScrollView, Image, Text, AsyncStorage, TouchableOpacity } from 'react-native';
import Roupa from '../components/Roupa';

export default class RoupasDoClienteScreen extends React.Component {

    state ={
        nome: '',
        modalVisible: false,
        cliente: '',
        clienteOid: '',
        objetos: [],
    };

    RoupasDoClienteScreen(){
        this.buscar = this.buscar.bind(this);
    }

    async componentWillMount(){
        const clienteOid = this.props.navigation.getParam('clienteOid');
        const cliente = this.props.navigation.getParam('cliente');
        const reload = true;//this.props.navigation.getParam('reload');
        this.setState({clienteOid, cliente});

        if(reload){
            this.buscar();
        }
    }

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
    
    hash(usuario) {        
        var dataString = this.dataString();
        var md5 = require('md5');
    
        var hashDaSenha = usuario.hashDaSenha;
        var hashDaData = md5(dataString);
    
        var hash = md5(hashDaSenha + ':' + hashDaData);
    
        return hash;
    };

    async buscar() {
        var usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));//this.getUser();
        var hash = this.hash(usuario);
        var email = usuario.email;
        var clienteOid = this.state.clienteOid;

        const call = await fetch(`http://painel.sualavanderia.com.br/api/BuscarRoupa.aspx?clienteOid=${clienteOid}&login=${email}&senha=${hash}`, 
            { 
                method: 'post' 
            });
        const response = await call.json();

        var objetos = [];

        for(index in response){
            const roupaResponse = response[index];

            const roupa = {
                oid: roupaResponse.Oid,
                tipo: roupaResponse.Tipo,
                tecido: roupaResponse.Tecido,
                tamanho: roupaResponse.Tamanho,
                marca: roupaResponse.Marca,
                cliente: roupaResponse.Cliente,
                clienteOid: roupaResponse.ClienteOid,
                observacao: roupaResponse.Observacao,
                codigo: roupaResponse.Codigo,
                chave: roupaResponse.Chave,
                cores: roupaResponse.Cores,
                ultimaLavagem: roupaResponse.UltimaLavagem,
            };

            objetos = [...objetos, roupa];    
        }

        this.setState({objetos})
    };

    async escolherRoupa(props, roupa) {
        props.navigation.state.params.reload(roupa.chave);
        props.navigation.goBack();
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.infoTitle}>Roupas do Cliente: {this.state.cliente.nome}</Text>
                </View>
                <ScrollView>                    
                    { this.state.objetos.map(roupa => 
                        <TouchableOpacity key={roupa.oid} onPress={() => this.escolherRoupa(this.props, roupa)}>
                            <Roupa roupa={roupa} />
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