import React from 'react';
import {StyleSheet, View, ScrollView, Image, TextInput, TouchableOpacity, Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Usuario from "../../components/Usuario";
import LoadingModal from '../../components/modals/LoadingModal';
import fetch from '../../utils/FetchWithTimeout';
import Text from '../../components/Text';

export default class SelecionarUsuarioDetails extends React.Component {

    state ={
        nome: '',
        papel: 'Cliente',
        objetos: [],
        modalVisible: false,
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
        if(this.state.nome != ''){
            this.setState({modalVisible: true});

            var usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));//this.getUser();
            var hash = this.hash(usuario);
            var email = usuario.email;

            var argumentos = `papeis=${this.state.papel}&nome=${this.state.nome}`;

            try{
                const call = await fetch(`https://painel.sualavanderia.com.br/api/BuscarUsuario.aspx?${argumentos}&login=${email}&senha=${hash}`, 
                    { 
                        method: 'post' 
                    });
                const response = await call.json();

                var objetos = [];

                for(index in response){
                    const objetoResponse = response[index];

                    const objeto = {
                        oid: objetoResponse.Oid,
                        nome: objetoResponse.Nome,
                        email: objetoResponse.Email,
                        papel: objetoResponse.Papel,
                        codigo: objetoResponse.Codigo,
                        vipClub: objetoResponse.VipClub,
                        unidade: objetoResponse.PontoDeColetaPadrao ? objetoResponse.PontoDeColetaPadrao.Nome : '',
                    };    

                    objetos = [...objetos, objeto];
                }

                this.setState({objetos});
            }catch(erro){
                alert('Erro.' + erro);
            }

            this.setState({modalVisible: false});
        }else{
            alert("Digite ao menos o primeiro nome");
        }
    };

    openVideoInformativo = () => {
        Linking.openURL("http://sualavanderia.com.br/videos/UsuarioScreen.mp4");
    };

    usuarioSelecionado = (usuario) => {
        this.props.navigation.state.params.acao(usuario);
        this.props.navigation.goBack();
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <View style={styles.viewHeader}>
                            <View style={styles.viewHeader}>
                                <Text style={styles.infoTitle}>Nome: </Text>
                                <TextInput
                                    style={styles.boxInput}
                                    value={this.state.nome}
                                    onChangeText={nome => this.setState({nome})} 
                                />
                            </View>

                            <TouchableOpacity onPress={this.buscar} style={styles.button}>
                                <Image style={styles.icon} source={require('../../images/pesquisar_32x32.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.objetoList}>
                    {this.state.objetos.map(objeto => 
                        <TouchableOpacity key={objeto.oid} onPress={() => this.usuarioSelecionado(objeto)}>
                            <Usuario objeto={objeto} />
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
            marginTop: 3,
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
    }
);