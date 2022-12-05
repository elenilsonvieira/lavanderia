import React from 'react';
import {StyleSheet, View, ScrollView, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import Roupa from '../components/Roupa';
import LoadingModal from '../components/modals/LoadingModal';
import fetch from '../utils/FetchWithTimeout';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class RoupasDoClienteScreen extends React.Component {

    state ={
        textoDaPesquisa: '',
        modalVisible: false,
        cliente: '',
        clienteOid: '',
        objetos: [],
        objetosFiltrados: [],
        modalVisible: false,
    };

    RoupasDoClienteScreen(){
        this.buscar = this.buscar.bind(this);
    }

    async componentWillMount(){
        const clienteOid = this.props.route.params.clienteOid;
        const cliente = this.props.route.params.cliente;
        const reload = true;//this.props.route.params.('reload');
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
        this.setState({modalVisible: true});

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

        this.setState({objetos, modalVisible: false, objetosFiltrados: objetos});
    };

    async escolherRoupa(props, roupa) {
        props.navigation.state.params.reload(roupa.chave);
        props.navigation.goBack();
    }

    filtrar =  () => {    
        this.setState({modalVisible: true});

        if(this.state.textoDaPesquisa.trim() !== '') {
            var objetosFiltrados = [];

            this.state.objetos.map(objeto => {
                if((objeto.tipo != null && objeto.tipo.toLowerCase().includes(this.state.textoDaPesquisa.toLowerCase())) ||
                    (objeto.marca != null && objeto.marca.toLowerCase().includes(this.state.textoDaPesquisa.toLowerCase()) ||
                    (objeto.chave != null && objeto.chave.toLowerCase().includes(this.state.textoDaPesquisa.toLowerCase()))) ||
                    (objeto.observacao != null && objeto.observacao.toLowerCase().includes(this.state.textoDaPesquisa.toLowerCase())) ||
                    (objeto.cores != null && objeto.cores.toLowerCase().includes(this.state.textoDaPesquisa.toLowerCase()))){ 
                    
                        objetosFiltrados = [...objetosFiltrados, objeto];
                }
            });

            this.setState({objetosFiltrados});
        }else{
            var objetosFiltrados = [...this.state.objetos];
            this.setState({objetosFiltrados});
        }

        this.setState({modalVisible: false});
    };

    filtrarPorLetra = (textoDaPesquisa) => {
        this.setState({textoDaPesquisa});
        this.filtrar();
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.viewHeader}>
                        <View style={styles.viewHeader}>
                            <TextInput
                                placeholder='Pesquisar'
                                style={styles.boxInput}
                                value={this.state.textoDaPesquisa}
                                onChangeText={textoDaPesquisa => this.setState({textoDaPesquisa})} 
                            />
                        </View>
                        <View style={styles.viewBotao}>
                            <TouchableOpacity onPress={this.filtrar} style={styles.button}>
                                <Image style={styles.icon} source={require('../images/pesquisar_32x32.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <ScrollView>                    
                    { this.state.objetosFiltrados.map(roupa => 
                        <TouchableOpacity key={roupa.oid} onPress={() => this.escolherRoupa(this.props, roupa)}>
                            <Roupa roupa={roupa} />
                        </TouchableOpacity>
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
          header:{
            justifyContent: 'flex-end',
            height: 40,
            backgroundColor: '#FFF',
          },
          viewHeader:{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 5,
          },
          viewHeaderSegundaLinha: {
            flexDirection: 'row',
            justifyContent: 'space-between',
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
        infoTitle: {
            fontWeight: 'bold',
        },
        infoTitleCliente: {
            marginRight: 20,
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