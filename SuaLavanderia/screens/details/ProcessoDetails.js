import React from 'react';
import {StyleSheet, View, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import LoadingModal from '../../components/modals/LoadingModal';
import MultiPicker from '../../components/MultiPicker';
import fetch from '../../utils/FetchWithTimeout';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Text from '../../components/Text';

export default class ProcessoDetails extends React.Component {

    state ={
        objeto: {},
        modalVisible: false,
    };

    async componentDidMount(){
        this.setState({modalVisible: true});

        const objeto = this.props.route.params.objeto;

        this.setState({objeto, modalVisible: false});
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
    
    hash = (usuario) => {        
        var dataString = this.dataString();
        var md5 = require('md5');
    
        var hashDaSenha = usuario.hashDaSenha;
        var hashDaData = md5(dataString);
    
        var hash = md5(hashDaSenha + ':' + hashDaData);
    
        return hash;
    };

    openLink = (link) => {
        if(link){
            Linking.openURL(link);
        }else{
            Alert('Não há nenhum link disponível no processo!');
        }
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.infoTitle}>Roupa</Text>

                    <TouchableOpacity onPress={() => this.salvar(this.state.objeto.link)} style={styles.button}>
                        <Image style={styles.icon} source={require('../../images/documento_32x32.png')} />
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    <View style={styles.objetoContainer}>
                        <Text style={styles.valorInfoTitle}>{this.state.objeto.nome}</Text>

                        <Text style={styles.valorInfoTitleCliente}>Categoria: {this.state.objeto.categoria}</Text>

                        <Text style={styles.valorInfoTitleCliente}>Periodicidade: {this.state.objeto.periodicidade}</Text>

                        <Text style={styles.valorInfoTitleCliente}>Descricao: {this.state.objeto.descricao}</Text>
                    </View>
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
            flexDirection: 'row',
          },
          objetoList: {
              paddingTop: 20,
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
            padding: 5,
        },
        boxDate:{
            backgroundColor: "#DDD",
            height: 40,
            borderRadius: 5,
            alignSelf: 'stretch',
            padding: 5,
            paddingTop: 10,
            justifyContent: 'center',
            fontSize: 15,
            fontWeight: 'bold',
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
        objetoContainer: {
            borderRadius: 5,
            backgroundColor: '#FFF',
            padding: 20,
            margin: 20,
            justifyContent: 'center',
        },
        movimentacaoInfoContainer: {
        },
        movimentacaoInfoContainerTitle: {
            alignItems: 'center',
        },
        valorInfoContainer: {
            flexDirection: 'row',
        },
        movimentacaoInfoTitle: {
            fontSize: 25,
            fontWeight: 'bold',
        },
        valorInfoTitle: {
            fontWeight: 'bold',
        },
        valorInfoTitleCliente: {
            fontWeight: 'bold',
            paddingTop: 10,
        },
        infoTitle: {
            fontWeight: 'bold',
            paddingTop: 10,
        },
        movimentacaoInfo: {
        },
        button:{
            padding: 10,
        },
        icon: {
            width: 24,
            height: 24,
        },
        multiSelect: {
            backgroundColor: "#DDD",
            height: 40,
            alignSelf: 'stretch',
        },
    }
);