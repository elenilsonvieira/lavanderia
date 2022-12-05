import React from 'react';
import {StyleSheet, View, Image, TextInput, TouchableOpacity } from 'react-native';
import fetch from '../../utils/FetchWithTimeout';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Text from '../../components/Text';

export default class AvaliacaoDetailsSoLeitura extends React.Component {

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

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                <Text style={styles.infoTitle}>Avaliação de Lavagem</Text>
                </View>

                <View style={styles.movimentacaoContainer}>
                    <Text style={styles.valorInfoTitle}>Data: </Text>
                    <Text style={styles.boxInput}>{this.state.data}</Text>

                    <Text style={styles.infoTitle}>Média: </Text>
                    <Text style={styles.boxInput}>{this.state.media}</Text>

                    <Text style={styles.infoTitle}>Nota do Atendimento: </Text>
                    <Text style={styles.boxInput}>{this.state.notaDoAtendimento}</Text>

                    <Text style={styles.infoTitle}>Nota da Lavagem: </Text>
                    <Text style={styles.boxInput}>{this.state.notaDaLavagem}</Text>

                    <Text style={styles.infoTitle}>Nota da Passagem: </Text>
                    <Text style={styles.boxInput}>{this.state.notaDaPassagem}</Text>

                    <Text style={styles.infoTitle}>Nota da Entrega: </Text>
                    <Text style={styles.boxInput}>{this.state.notaDaEntrega}</Text>

                    <Text style={styles.infoTitle}>Comentários: </Text>
                    <Text style={styles.boxInput}>{this.state.comentarios}</Text>
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