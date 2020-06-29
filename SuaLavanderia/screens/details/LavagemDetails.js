import React from 'react';
import {StyleSheet, View, ScrollView, Image, Text, AsyncStorage, TouchableOpacity, Linking } from 'react-native';
import RoupaEmLavagem from '../../components/RoupaEmLavagem';
import LoadingModal from '../../components/modals/LoadingModal';
import fetch from '../../utils/FetchWithTimeout';

export default class LavagemDetails extends React.Component {

    state ={
        nome: '',
        modalVisible: false,
    };

    LavagemDetails(){
        this.buscar = this.buscar.bind(this);
    }

    navegarParaDetalhes(props, roupaEmLavagem){
        const lavagem = this.props.navigation.getParam('lavagem');
        const cliente = lavagem.cliente;
        const clienteOid = lavagem.clienteOid;
        const lavagemOid = lavagem.oid;

        if(lavagem.status == 'Anotada'){
            props.navigation.navigate('RoupaEmLavagemDetails', {roupaEmLavagem: roupaEmLavagem, cliente: cliente, clienteOid: clienteOid, lavagemOid: lavagemOid, reload: this.buscar.bind(this)});
        }else {
            alert('Essa lavagem já está anotada.');
        }
    }

    navegarParaEdit(props){
        const lavagem = this.props.navigation.getParam('lavagem');
        props.navigation.navigate('LavagemDetailsEdit', {lavagem: lavagem, reload: this.buscar.bind(this)});
    }

    pagar(){
        const lavagem = this.props.navigation.getParam('lavagem');
        
        if(lavagem.paga != 'Não/Parcialmente'){
            alert("Essa lavagem já está paga!");
        }else{
            this.props.navigation.navigate('MovimentacaoDeCaixaDetails', {lavagem: lavagem, reload: this.buscar.bind(this)});
        }
    }

    avaliar(){
        const lavagem = this.props.navigation.getParam('lavagem');
        
        if(lavagem.status != 'Entregue'){
            alert("Essa lavagem ainda não foi entregue para poder ser avaliada!");
        }else{
            var tela = lavagem.avaliacao == null ? 'AvaliacaoDetails' : 'AvaliacaoDetailsSoLeitura';
            this.props.navigation.navigate(tela, {lavagem: lavagem, reload: this.buscar.bind(this)});
        }
    }

    async componentWillMount(){
        const lavagem = this.props.navigation.getParam('lavagem');
        const reload = true;//this.props.navigation.getParam('reload');
        this.setState({lavagem});

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
        var oid = this.state.lavagem.oid;

        this.setState({modalVisible: true});

        try{
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

                var avaliacao = null;

                if(objetoResponse.Avaliacao){
                    avaliacao = {
                        data: objetoResponse.Avaliacao.Data,
                        notaDoAtendimento: objetoResponse.Avaliacao.NotaDoAtendimento,
                        notaDaLavagem: objetoResponse.Avaliacao.NotaDaLavagem,
                        notaDaPassagem: objetoResponse.Avaliacao.NotaDaPassagem,
                        notaDaEntrega: objetoResponse.Avaliacao.NotaDaEntrega,
                        comentarios: objetoResponse.Avaliacao.Comentarios,
                        media: (parseInt(objetoResponse.Avaliacao.NotaDoAtendimento) + parseInt(objetoResponse.Avaliacao.NotaDaLavagem) + parseInt(objetoResponse.Avaliacao.NotaDaPassagem) + parseInt(objetoResponse.Avaliacao.NotaDaEntrega)) / 4,//objetoResponse.Media,
                    };
                }

                const lavagem = {
                    oid: objetoResponse.Oid,
                    cliente: objetoResponse.Cliente,
                    clienteOid: objetoResponse.ClienteOid,
                    dataDeRecebimento: objetoResponse.DataDeRecebimento,
                    dataPreferivelParaEntrega: objetoResponse.DataPreferivelParaEntrega,
                    horaPreferivelParaEntrega: objetoResponse.HoraPreferivelParaEntrega,
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
                    avaliacao: avaliacao,
                };    

                this.setState({lavagem});
            }

            this.setState({modalVisible: false});
        }catch{
            this.setState({modalVisible: false});
            alert('Erro buscando lavagem');
        }
    };

    openVideoInformativo = () => {
        Linking.openURL("http://sualavanderia.com.br/videos/LavagemDetails.mp4");
    };

    render(){
        const lavagem = this.state.lavagem;

        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.infoTitle}>Lavagem</Text>

                    <TouchableOpacity onPress={() => this.pagar()} style={styles.button}>
                        <Image style={styles.icon} source={require('../../images/movimentacao-de-caixa_32x32.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.avaliar()} style={styles.button}>
                        <Image style={styles.icon} source={require('../../images/avaliacao_32x32.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.navegarParaDetalhes(this.props, null)} style={styles.button}>
                        <Image style={styles.icon} source={require('../../images/roupa-dobrada_32x32.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.openVideoInformativo} style={styles.button}>
                        <Image style={styles.icon} source={require('../../images/pergunta_32x32.png')} />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <TouchableOpacity onPress={() => this.navegarParaEdit(this.props)}>
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
                                <Text style={styles.lavagemInfoTitle}>Data Preferível para Entrega: </Text>
                                <Text style={styles.lavagemInfo}>{lavagem.dataPreferivelParaEntrega}</Text>
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
                                <Text style={styles.lavagemInfo}>R$ {lavagem.valor}</Text>
                            </View>

                            <View style={styles.lavagemInfoContainer}>
                                <Text style={styles.lavagemInfoTitle}>Paga: </Text>
                                <Text style={styles.lavagemInfo}>{lavagem.paga}</Text>
                            </View>

                            <View style={styles.lavagemInfoContainer}>
                                <Text style={styles.lavagemInfoTitle}>Saldo Devedor: </Text>
                                <Text style={styles.lavagemInfo}>R$ {lavagem.saldoDevedor}</Text>
                            </View>

                            <View style={styles.lavagemInfoContainer}>
                                <Text style={styles.lavagemInfoTitle}>Avaliação: </Text>
                                <Text style={styles.lavagemInfo}>{lavagem.avaliacao != null ? lavagem.avaliacao.media : null}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.roupasContainer}>
                        <Text style={styles.roupasTitle}>Roupas</Text>
                    </View>
                    
                    { lavagem.roupas.map(roupaEmLavagem => 
                        <TouchableOpacity key={roupaEmLavagem.roupa.oid} onPress={() => this.navegarParaDetalhes(this.props, roupaEmLavagem)}>
                            <RoupaEmLavagem roupaEmLavagem={roupaEmLavagem} />
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