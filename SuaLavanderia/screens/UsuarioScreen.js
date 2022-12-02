import React from 'react';
import {StyleSheet, View, ScrollView, Image, Text, TextInput, TouchableOpacity, Linking } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Usuario from "../components/Usuario";
import LoadingModal from '../components/modals/LoadingModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetch from '../utils/FetchWithTimeout';

export default class UsuarioScreen extends React.Component {

    static navigationOptions = {
      drawerLabel: 'Usuário',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('../images/male-icon.png')}
          style={styles.icon}
        />
      ),
    };

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

            var argumentos = `nome=${this.state.nome}`;

            if(this.state.papel != ''){
                argumentos += `&papeis=${this.state.papel}`;
            }

            try{
                const call = await fetch(`http://painel.sualavanderia.com.br/api/BuscarUsuario.aspx?${argumentos}&login=${email}&senha=${hash}`, 
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
                        </View>
                        <View style={styles.viewHeaderSegundaLinha}>
                            <View style={styles.viewHeader}>
                                <Text style={styles.infoTitle}>Papel: </Text>
                                <Picker
                                    style={styles.picker} 
                                    selectedValue={this.state.papel}
                                    onValueChange={(itemValue, itemIndex) => this.setState({papel: itemValue})} >
                                    <Picker.Item label='Cliente' value='Cliente' />
                                    <Picker.Item label='Operações' value='Operacoes' />
                                    <Picker.Item label='Supervisor de Operações' value='SupervisorDeOperacoes' />
                                    <Picker.Item label='Atendente' value='Atendente' />
                                    <Picker.Item label='Gerente Dde Operações' value='GerenteDeOperacoes' />
                                    <Picker.Item label='Gerente Geral' value='GerenteGeral' />
                                    <Picker.Item label='Sub-gerente Geral' value='SubGerenteGeral' />
                                    <Picker.Item label='Entregador' value='Entregador' />
                                    <Picker.Item label='Tudo' value='' />
                                </Picker>
                            </View>

                            <View style={styles.viewBotao}>
                                <TouchableOpacity onPress={this.buscar} style={styles.button}>
                                    <Image style={styles.icon} source={require('../images/pesquisar_32x32.png')} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={this.openVideoInformativo} style={styles.button}>
                                    <Image style={styles.icon} source={require('../images/pergunta_32x32.png')} />
                                </TouchableOpacity>
                            </View>                            
                        </View>
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.objetoList}>
                    {this.state.objetos.map(objeto => 
                        <TouchableOpacity key={objeto.oid} onPress={() => this.props.navigation.navigate('UsuarioDetails', {objeto: objeto})}>
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