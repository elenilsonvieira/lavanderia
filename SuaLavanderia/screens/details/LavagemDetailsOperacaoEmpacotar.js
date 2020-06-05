import React from 'react';
import {TouchableOpacity, Image, StyleSheet, View, ScrollView, Text, AsyncStorage } from 'react-native';
import RoupaEmLavagem from '../../components/RoupaEmLavagem';
import ConfirmacaoModal from '../../components/modals/ConfirmacaoModal';
import LoadingModal from '../../components/modals/LoadingModal';

export default class LavagemDetailsOperacaoEmpacotar extends React.Component {

    state ={
        nome: '',
        modalVisible: false,
        confirmacaoModalVisible: false,
        roupasSelecionadas: [],
    };

    async componentWillMount(){
        const lavagem = this.props.navigation.getParam('lavagem');
        this.setState({lavagem});
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

    openModal = () => {
        this.setState({confirmacaoModalVisible: true});
    };
    
    closeModal = () => {
        this.setState({confirmacaoModalVisible: false});
    };

    acao = () => {
        this.setState({confirmacaoModalVisible: false});
        this.props.navigation.getParam("acao")();
    };

    empacotarComCabides = () => {
        if(this.state.roupasSelecionadas.length == 0){
            alert('Selecione ao menos uma roupa');
        }else{
            this.empacotar("cabide");
        }
    };

    empacotarRoupasDobradas = () => {
        if(this.state.roupasSelecionadas.length == 0){
            alert('Selecione ao menos uma roupa');
        }else{
            this.empacotar("dobrada");
        }
    };

    empacotar = async (tipoDePacote) => {
        this.setState({modalVisible: true});

        var usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));
        var hash = this.hash(usuario);
        var email = usuario.email;
        const usuarioOid = this.props.navigation.getParam('usuarioOid');

        var roupaEmLavagemOids = this.state.roupasSelecionadas[0].oid;

        for (i = 1; i < this.state.roupasSelecionadas.length; i++) {
            roupaEmLavagemOids = roupaEmLavagemOids + ';' + this.state.roupasSelecionadas[i].oid;
        }

        alert(roupaEmLavagemOids);

        var argumentos = `roupaEmLavagemOid=${roupaEmLavagemOids}&usuarioOid=${usuarioOid}&tipoDePacote=${tipoDePacote}`;

        try{
            const call = await fetch(`http://painel.sualavanderia.com.br/api/EmpacotarRoupa.aspx?${argumentos}&login=${email}&senha=${hash}`, 
                { 
                    method: 'post' 
                });
            
            if(call.status != 200){
                alert('Erro.' + call.statusText);    
            }            
        }catch(erro){
            alert('Erro.' + erro);
        }

        this.setState({modalVisible: false, roupasSelecionadas: []});
    };

    selecionarRoupa = (roupaEmLavagem) => {
        var roupasSelecionadas = [];
        var jaContem = false;

        for(index in this.state.roupasSelecionadas){
            const roupa = this.state.roupasSelecionadas[index];

            if(roupa.oid != roupaEmLavagem.oid){
                roupasSelecionadas = [...roupasSelecionadas, roupa];
            }else{
                jaContem = true;
            }
        }

        if(!jaContem){
            roupasSelecionadas = [...roupasSelecionadas, roupaEmLavagem];
        }

        this.setState({roupasSelecionadas});
    };

    roupaJaSelecionada = (roupaEmLavagem) => {
        for(index in this.state.roupasSelecionadas){
            const roupa = this.state.roupasSelecionadas[index];

            if(roupa.oid == roupaEmLavagem.oid){
                return true;
            }
        }

        return false;
    };

    render(){
        const lavagem = this.state.lavagem;

        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.infoTitle}>Lavagem</Text>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={styles.button}>
                        <Image style={styles.icon} source={require('../../images/salvar_32x32.png')} />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <TouchableOpacity onPress={() => this.openModal()}>
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
                        </View>
                    </TouchableOpacity>

                    <View style={styles.roupasContainer}>
                        <Text style={styles.roupasTitle}>Roupas</Text>

                        <View style={styles.botoesContainer}>
                            <TouchableOpacity onPress={() => this.empacotarRoupasDobradas()} style={styles.buttonAcao}>
                                <Image style={styles.iconAcao} source={require('../../images/roupa-dobrada_32x32.png')} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.empacotarComCabides()} style={styles.buttonAcao}>
                                <Image style={styles.iconAcao} source={require('../../images/cabide2_32x32.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    { lavagem.roupas.map(roupaEmLavagem => 
                        <TouchableOpacity onPress={() => this.selecionarRoupa(roupaEmLavagem)}>
                            <RoupaEmLavagem key={roupaEmLavagem.roupa.oid} roupaEmLavagem={roupaEmLavagem} 
                                styleExtra={ this.roupaJaSelecionada(roupaEmLavagem) ? 
                                    { borderWidth: 10, borderColor: 'green'} : {}} />
                        </TouchableOpacity>
                    )}
                </ScrollView>

                <LoadingModal modalVisible={this.state.modalVisible} />
                <ConfirmacaoModal visible={this.state.confirmacaoModalVisible} texto={this.props.navigation.getParam("texto")} 
                    onSim={() => this.acao()} onNao={() => this.closeModal()} />
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
            justifyContent: 'center',
            height: 40,
            backgroundColor: '#FFF',
            flexDirection: 'row',
          },
          botoesContainer:{
            alignItems: 'center',
            justifyContent: 'center',
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
        buttonAcao:{
            marginHorizontal: 20,
        },
        icon: {
            width: 24,
            height: 24,
        },
        iconAcao: {
            width: 48,
            height: 48,
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