import React from 'react';
import {StyleSheet, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import LoadingModal from '../../components/modals/LoadingModal';
import MultiPicker from '../../components/MultiPicker';
import fetch from '../../utils/FetchWithTimeout';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Text from '../../components/Text';

export default class MovimentacaoDeCaixaDetails extends React.Component {

    state ={
        oid: '',
        tipo: '',
        tipoOid: '',
        tecido: '',
        tecidoOid: '',
        tamanho: '',
        tamanhoOid: '',
        marca: '',
        marcaOid: '',
        cores: '',
        coresOid: '',
        observacao: '',
        codigo: '',
        cliente: '',
        clienteOid: '',
        chave: '',
        tiposArray: [], 
        tecidosArray: [], 
        tamanhosArray: [], 
        marcasArray: [], 
        coresArray: [],
        modalVisible: false,
        coresSelecionadas: [],
        tiposSelecionados: [],
        tecidosSelecionados: [],
        tamanhosSelecionados: [],
        marcasSelecionadas: [],
    };

    async componentDidMount(){
        this.setState({modalVisible: true});
        
        var tiposArray = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:tipos")) || [];
        var tecidosArray = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:tecidos")) || [];
        var tamanhosArray = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:tamanhos")) || [];
        var marcasArray = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:marcas")) || [];
        var coresArray = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:cores")) || [];

        const roupa = this.props.route.params.roupa;
        const cliente = this.props.route.params.cliente;
        const clienteOid = this.props.route.params.clienteOid;
        const lavagemOid = this.props.route.params.lavagemOid;

        var tipo = '';

        if(roupa != null){
            const oid = roupa.oid;
            const tipo = roupa.tipo;
            const tecido = roupa.tecido;
            const tamanho = roupa.tamanho;
            const marca = roupa.marca;
            const observacao = roupa.observacao;
            const codigo = roupa.codigo;
            const chave = roupa.chave;
            const cliente = roupa.cliente;
            const clienteOid = roupa.clienteOid;
            const cores = roupa.cores;

            this.setState({roupa, oid, tipo, tecido, tamanho, marca, observacao, codigo, chave, cliente, clienteOid, cores});
        }

        this.setState({tiposArray, tecidosArray, tamanhosArray, marcasArray, coresArray, cliente, clienteOid, lavagemOid, modalVisible: false});
    }

    async salvar(props) {
        if(this.state.tipo == ''){
            alert('Escolha ao menos o tipo.');
            return;
        }

        this.setState({modalVisible: true});

        var usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));//this.getUser();
        var hash = this.hash(usuario);
        var email = usuario.email;

        const roupa = this.props.route.params.roupa;

        var argumentos = 'clienteOid=' + this.state.clienteOid + '&tipoOid=' + this.state.tipoOid;

        if(this.state.tecidoOid != ''){
            argumentos += '&tecidoOid=' + this.state.tecidoOid;
        }

        if(this.state.tamanhoOid != ''){
            argumentos += '&tamanhoOid=' + this.state.tamanhoOid;
        }

        if(this.state.marcaOid != ''){
            argumentos += '&marcaOid=' + this.state.marcaOid;
        }

        if(this.state.coresOid != ''){
            argumentos += '&coresOid=' + this.state.coresOid;
        }

        if(this.state.observacao != ''){
            argumentos += '&observacoes=' + this.state.observacao;
        }

        if(this.state.codigo != ''){
            argumentos += '&codigo=' + this.state.codigo;
        }

        if(roupa != null){
            argumentos += '&oid=' + roupa.oid;
        }

        const call = await fetch(`http://painel.sualavanderia.com.br/api/AdicionarRoupa.aspx?${argumentos}&login=${email}&senha=${hash}`, 
            { 
                method: 'post' 
            });

        try{
            const response = await call.json();
            const roupaResponse = response[0];
            const chave = roupaResponse.Chave;

            alert(roupa == null ? 'Adicionado com sucesso!' : 'Alterado com sucesso!');
            props.navigation.state.params.reload(chave);
            this.setState({modalVisible: false});
            props.navigation.goBack();
        }catch(erro){
            this.setState({modalVisible: false});
            alert('Erro adicionando/alterando roupa. ' + erro);
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
    
    hash = (usuario) => {        
        var dataString = this.dataString();
        var md5 = require('md5');
    
        var hashDaSenha = usuario.hashDaSenha;
        var hashDaData = md5(dataString);
    
        var hash = md5(hashDaSenha + ':' + hashDaData);
    
        return hash;
    };

    onCoresChange = (coresSelecionadas) => {
        var coresOid = '';

        for(index in coresSelecionadas){
            if(coresOid == ''){
                coresOid = coresSelecionadas[index];
            }else{
                coresOid += ';' + coresSelecionadas[index];
            }
        }

        this.setState({ coresOid, coresSelecionadas });
    }

    onTiposChange = (tiposSelecionados) => {
        var tipoOid = tiposSelecionados ? tiposSelecionados : '';
        this.setState({ tipoOid, tiposSelecionados });
    }

    onTecidosChange = (tecidosSelecionados) => {
        var tecidoOid = tecidosSelecionados ? tecidosSelecionados : '';
        this.setState({ tecidoOid, tecidosSelecionados });
    }

    onTamanhosChange = (tamanhosSelecionados) => {
        var tamanhoOid = tamanhosSelecionados ? tamanhosSelecionados : '';
        this.setState({ tamanhoOid, tamanhosSelecionados });
    }

    onMarcasChange = (marcasSelecionadas) => {
        var marcaOid = marcasSelecionadas ? marcasSelecionadas : '';
        this.setState({ marcaOid, marcasSelecionadas });
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.infoTitle}>Roupa</Text>

                    <TouchableOpacity onPress={() => this.salvar(this.props)} style={styles.button}>
                        <Image style={styles.icon} source={require('../../images/salvar_32x32.png')} />
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    <View style={styles.objetoContainer}>
                        <Text style={styles.valorInfoTitle}>Oid: {this.state.oid}</Text>

                        <Text style={styles.valorInfoTitleCliente}>Cliente: {this.state.cliente}</Text>

                        <Text style={styles.infoTitle}>Tipo: </Text>
                        <MultiPicker 
                            objetos={this.state.tiposArray}
                            onSelectedItemsChange={this.onTiposChange}
                            objetosSelecionados={this.state.tiposSelecionados}
                        />

                        <Text style={styles.infoTitle}>Tecido: </Text>
                        <MultiPicker 
                            objetos={this.state.tecidosArray}
                            onSelectedItemsChange={this.onTecidosChange}
                            objetosSelecionados={this.state.tecidosSelecionados}
                        />

                        <Text style={styles.infoTitle}>Tamanho: </Text>
                        <MultiPicker 
                            objetos={this.state.tamanhosArray}
                            onSelectedItemsChange={this.onTamanhosChange}
                            objetosSelecionados={this.state.tamanhosSelecionados}
                        />

                        <Text style={styles.infoTitle}>Marca: </Text>
                        <MultiPicker 
                            objetos={this.state.marcasArray}
                            onSelectedItemsChange={this.onMarcasChange}
                            objetosSelecionados={this.state.marcasSelecionadas}
                        />

                        <Text style={styles.infoTitle}>Código: </Text>
                        <TextInput
                            style={styles.boxInput}
                            value={this.state.codigo}
                            onChangeText={codigo => this.setState({codigo})}
                        />

                        <Text style={styles.infoTitle}>Observação: </Text>
                        <TextInput
                            style={styles.boxInput}
                            value={this.state.observacao}
                            onChangeText={observacao => this.setState({observacao})}
                        />

                        <Text style={styles.infoTitle}>Cores: </Text>
                        <MultiPicker 
                            objetos={this.state.coresArray}
                            multiplaEscolha={true}
                            onSelectedItemsChange={this.onCoresChange}
                            objetosSelecionados={this.state.coresSelecionadas}
                        />
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