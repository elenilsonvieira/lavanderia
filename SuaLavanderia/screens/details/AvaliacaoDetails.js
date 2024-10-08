import React from 'react';
import {StyleSheet, View, Image, TextInput, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import fetch from '../../utils/FetchWithTimeout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Text from '../../components/Text';

export default class AvaliacaoDetails extends React.Component {

    state ={
        data: '',
        notaDoAtendimento: '10',
        notaDaLavagem: '10',
        notaDaPassagem: '10',
        notaDaEntrega: '10',
        comentarios: '',
        media: '10',
    };

    componentDidMount(){
        const lavagem = this.props.route.params.lavagem;

        if(lavagem.avaliacao != null){
            const data = lavagem.avaliacao.data;
            const notaDoAtendimento = lavagem.avaliacao.notaDoAtendimento.toString();
            const notaDaLavagem = lavagem.avaliacao.notaDaLavagem.toString();
            const notaDaPassagem = lavagem.avaliacao.notaDaPassagem.toString();
            const notaDaEntrega = lavagem.avaliacao.notaDaEntrega.toString();
            const comentarios = lavagem.avaliacao.comentarios;
            const media = lavagem.avaliacao.media.toString();

            this.setState({data, notaDoAtendimento, notaDaLavagem, notaDaPassagem, notaDaEntrega, comentarios, media});
        }

        this.setState({lavagem});
    }

    async salvar(props) {
        if(isNaN(this.state.notaDoAtendimento) || isNaN(this.state.notaDaLavagem) 
            || isNaN(this.state.notaDaPassagem) || isNaN(this.state.notaDaEntrega)){
            alert('Preencha as notas com apenas números');
            return;
        }

        if(this.state.notaDoAtendimento < 1 || this.state.notaDoAtendimento > 10
            || this.state.notaDaLavagem < 1 || this.state.notaDaLavagem > 10
            || this.state.notaDaPassagem < 1 || this.state.notaDaPassagem > 10
            || this.state.notaDaEntrega < 1 || this.state.notaDaEntrega > 10){
            alert('Preencha as notas com valores de 1 a 10');
            return;
        }

        var usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));
        var hash = this.hash(usuario);
        var email = usuario.email;

        const lavagem = this.props.route.params.lavagem;

        var argumentos = 'lavagemOid=' + lavagem.oid + '&notaDoAtendimento=' + this.state.notaDoAtendimento + '&notaDaLavagem=' + this.state.notaDaLavagem + '&notaDaPassagem=' + this.state.notaDaPassagem + '&notaDaEntrega=' + this.state.notaDaEntrega + '&comentarios=' + this.state.comentarios;

        const call = await fetch(`https://painel.sualavanderia.com.br/api/AdicionarAvaliacao.aspx?${argumentos}&login=${email}&senha=${hash}`, 
            { 
                method: 'post' 
            }).then(function(response){
                if(response.status == 200){
                    alert(lavagem.avaliacao == null ? 'Adicionado com sucesso!' : 'Alterado com sucesso!');

                    props.navigation.state.params.reload();
                    props.navigation.goBack();
                }else{
                    alert('Erro adicionando/alterando avaliação.');    
                }
            }
            ).catch(function(error){
                alert('Erro adicionando a avaliação.' + error);    
            });        
    }

    dataEscolhida = (dataEscolhida) => {
        var dia = dataEscolhida.getDate();
        var mes = dataEscolhida.getMonth() + 1;

        if(dia < 10){
            dia = '0' + dia;
        }

        if(mes < 10){
            mes = '0' + mes;
        }

        this.setState({ 
            dataTimePickerVisible: false,
            data: dia + '/' + mes + '/' + dataEscolhida.getFullYear(),
        });
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
    
    getUser = async () => {
        var usuario;
    
        try{
          usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));
        }catch(exception){}
    
        return usuario;
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.infoTitle}>Avaliar Lavagem</Text>

                    <TouchableOpacity onPress={() => this.salvar(this.props)} style={styles.button}>
                        <Image style={styles.icon} source={require('../../images/salvar_32x32.png')} />
                    </TouchableOpacity>
                </View>

                <View style={styles.movimentacaoContainer}>
                    <Text style={styles.infoTitle}>Nota do Atendimento: </Text>
                    <TextInput
                        style={styles.boxInput}
                        value={this.state.notaDoAtendimento}
                        keyboardType='numeric'
                        onChangeText={notaDoAtendimento => this.setState({notaDoAtendimento})}
                    />

                    <Text style={styles.infoTitle}>Nota da Lavagem: </Text>
                    <TextInput
                        style={styles.boxInput}
                        value={this.state.notaDaLavagem}
                        keyboardType='numeric'
                        onChangeText={notaDaLavagem => this.setState({notaDaLavagem})}
                    />

                    <Text style={styles.infoTitle}>Nota da Passagem: </Text>
                    <TextInput
                        style={styles.boxInput}
                        value={this.state.notaDaPassagem}
                        keyboardType='numeric'
                        onChangeText={notaDaPassagem => this.setState({notaDaPassagem})}
                    />

                    <Text style={styles.infoTitle}>Nota da Entrega: </Text>
                    <TextInput
                        style={styles.boxInput}
                        value={this.state.notaDaEntrega}
                        keyboardType='numeric'
                        onChangeText={notaDaEntrega => this.setState({notaDaEntrega})}
                    />

                    <Text style={styles.infoTitle}>Comentários: </Text>
                    <TextInput
                        style={styles.boxInput}
                        value={this.state.comentarios}
                        onChangeText={comentarios => this.setState({comentarios})}
                    />
                </View>
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
        movimentacaoContainer: {
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
    }
);