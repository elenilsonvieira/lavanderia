import React from 'react';
import {TouchableOpacity, Image, StyleSheet, View, ScrollView, Text } from 'react-native';
import RoupaEmLavagem from '../../components/RoupaEmLavagem';
import fetch from '../../utils/FetchWithTimeout';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LavagemDetailsCliente extends React.Component {

    state ={
        nome: '',
        modalVisible: false,
    };

    LavagemDetails(){
        this.buscar = this.buscar.bind(this);
    }

    navegarParaDetalhes(props, roupaEmLavagem){
        const lavagem = this.props.route.params.lavagem;
        const cliente = lavagem.cliente;
        const clienteOid = lavagem.clienteOid;
        const lavagemOid = lavagem.oid;

        if(lavagem.status == 'Anotada'){
            props.navigation.navigate('RoupaEmLavagemDetails', {roupaEmLavagem: roupaEmLavagem, cliente: cliente, clienteOid: clienteOid, lavagemOid: lavagemOid, reload: this.buscar.bind(this)});
        }else {
            alert('Essa lavagem já está anotada.');
        }
    }

    pagar(){
        const lavagem = this.props.route.params.lavagem;
        
        if(lavagem.paga != 'Não/Parcialmente'){
            alert("Essa lavagem já está paga!");
        }else{
            this.props.navigation.navigate('MovimentacaoDeCaixaDetails', {lavagem: lavagem, reload: this.buscar.bind(this)});
        }
    }

    async componentWillMount(){
        const lavagem = this.props.route.params.lavagem;
        const reload = true;//this.props.route.params.('reload');
        this.setState({lavagem});

        if(reload){
            this.buscar();
        }
    }

    avaliar(){
        const lavagem = this.props.route.params.lavagem;
        
        if(lavagem.status != 'Entregue'){
            alert("Essa lavagem ainda não foi entregue para poder ser avaliada!");
        }else{
            var tela = lavagem.avaliacao == null ? 'AvaliacaoDetails' : 'AvaliacaoDetailsSoLeitura';
            this.props.navigation.navigate(tela, {lavagem: lavagem, reload: this.buscar.bind(this)});
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
        var oid = this.state.lavagem.oid;

        const call = await fetch(`http://painel.sualavanderia.com.br/api/BuscarLavagem.aspx?oid=${oid}&login=${email}&senha=${hash}`, 
            { 
                method: 'post' 
            });
        const response = await call.json();

        var objetos = [];

        for(index in response){
            const objetoResponse = response[index];
            var roupas = [];

            for(indexRoupa in objetoResponse.Roupas){
                const roupaResponse = objetoResponse.Roupas[indexRoupa];

                const roupaEmLavagem = {
                    oid: roupaResponse.Oid,
                    quantidade: roupaResponse.Quantidade,
                    observacoes: roupaResponse.Observacoes,
                    soPassar: roupaResponse.SoPassar,
                    pacoteDeRoupa: roupaResponse.PacoteDeRoupa,
                    roupa: {
                        oid: roupaResponse.Roupa.Oid,
                        tipo: roupaResponse.Roupa.Tipo,
                        tecido: roupaResponse.Roupa.Tecido,
                        tamanho: roupaResponse.Roupa.Tamanho,
                        marca: roupaResponse.Roupa.Marca,
                        cliente: roupaResponse.Roupa.Cliente,
                        clienteOid: roupaResponse.Roupa.ClienteOid,
                        observacao: roupaResponse.Roupa.Observacao,
                        codigo: roupaResponse.Roupa.Codigo,
                        chave: roupaResponse.Roupa.Chave,
                        cores: roupaResponse.Roupa.Cores,
                    },
                };

                roupas = [...roupas, roupaEmLavagem];
            }

            const lavagem = {
                oid: objetoResponse.Oid,
                cliente: objetoResponse.Cliente,
                clienteOid: objetoResponse.ClienteOid,
                dataDeRecebimento: objetoResponse.DataDeRecebimento,
                dataPreferivelParaEntrega: objetoResponse.DataPreferivelParaEntrega,
                horaPreferivelParaEntrega: objetoResponse.HoraPreferivelParaEntrega,
                empacotada: objetoResponse.Empacotada,
                soPassar: objetoResponse.SoPassar,
                dataDeEntrega: objetoResponse.DataDeEntrega,
                valor: objetoResponse.Valor,
                saldoDevedor: objetoResponse.SaldoDevedor,
                paga: objetoResponse.Paga,
                unidadeDeRecebimentoOid: objetoResponse.UnidadeDeRecebimentoOid,
                unidadeDeRecebimento: objetoResponse.UnidadeDeRecebimento,
                quantidadeDePecas: objetoResponse.QuantidadeDePecas,
                pesoDaPassagem: objetoResponse.PesoDaPassagem,
                roupas: roupas,
                status: objetoResponse.Status,
            };    

            this.setState({lavagem});
        }
    };

    render(){
        const lavagem = this.state.lavagem;

        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.infoTitle}>Lavagem</Text>

                    <TouchableOpacity onPress={() => this.avaliar()} style={styles.button}>
                        <Image style={styles.icon} source={require('../../images/avaliacao_32x32.png')} />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.unidadeContainer}>
                        <View style={styles.lavagemInfoContainerCliente}>
                            <Text style={styles.lavagemInfoCliente}>{lavagem.cliente} ({lavagem.codigoDoCliente})</Text>
                        </View>

                        <View style={styles.lavagemInfoContainer}>
                            <Text style={styles.lavagemInfoTitle}>Unidade: </Text>
                            <Text style={styles.lavagemInfo}>{lavagem.unidadeDeRecebimento}</Text>
                        </View>

                        <View style={styles.lavagemInfoContainer}>
                            <Text style={styles.lavagemInfoTitle}>Data de Recebimento: </Text>
                            <Text style={styles.lavagemInfo}>{lavagem.dataDeRecebimento}</Text>
                        </View>

                        <View style={styles.lavagemInfoContainer}>
                            <Text style={styles.lavagemInfoTitle}>Data para Entrega: </Text>
                            <Text style={styles.lavagemInfo}>{lavagem.dataPreferivelParaEntrega}</Text>
                        </View>

                        <View style={styles.lavagemInfoContainer}>
                            <Text style={styles.lavagemInfoTitle}>Hora para Entrega: </Text>
                            <Text style={styles.lavagemInfo}>{lavagem.horaPreferivelParaEntrega}</Text>
                        </View>

                        <View style={styles.lavagemInfoContainer}>
                            <Text style={styles.lavagemInfoTitle}>Data de Entrega: </Text>
                            <Text style={styles.lavagemInfo}>{lavagem.dataDeEntrega}</Text>
                        </View>

                        <View style={styles.lavagemInfoContainer}>
                            <Text style={styles.lavagemInfoTitle}>Status: </Text>
                            <Text style={styles.lavagemInfo}>{lavagem.status}</Text>
                        </View>

                        <View style={styles.lavagemInfoContainer}>
                            <Text style={styles.lavagemInfoTitle}>Quantidade de Peças: </Text>
                            <Text style={styles.lavagemInfo}>{lavagem.quantidadeDePecas}</Text>
                        </View>

                        <View style={styles.lavagemInfoContainer}>
                            <Text style={styles.lavagemInfoTitle}>Valor: </Text>
                            <Text style={styles.lavagemInfo}>{lavagem.valor}</Text>
                        </View>

                        <View style={styles.lavagemInfoContainer}>
                            <Text style={styles.lavagemInfoTitle}>Paga: </Text>
                            <Text style={styles.lavagemInfo}>{lavagem.paga}</Text>
                        </View>

                        <View style={styles.lavagemInfoContainer}>
                            <Text style={styles.lavagemInfoTitle}>Saldo Devedor: </Text>
                            <Text style={styles.lavagemInfo}>{lavagem.saldoDevedor}</Text>
                        </View>
                    </View>

                    <View style={styles.roupasContainer}>
                        <Text style={styles.roupasTitle}>Roupas</Text>
                    </View>
                    
                    { lavagem.roupas.map(roupaEmLavagem => 
                        <RoupaEmLavagem key={roupaEmLavagem.roupa.oid} roupaEmLavagem={roupaEmLavagem} />
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