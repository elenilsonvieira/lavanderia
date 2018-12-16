import React from 'react';
import {StyleSheet, View, Picker, Image, Text, TextInput, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';
import LoadingModal from '../../components/modals/LoadingModal';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

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
    };

    async componentDidMount(){
        this.setState({modalVisible: true});
        
        var tiposArray = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:tipos")) || [];
        var tecidosArray = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:tecidos")) || [];
        var tamanhosArray = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:tamanhos")) || [];
        var marcasArray = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:marcas")) || [];
        var coresArray = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:cores")) || [];

        const roupa = this.props.navigation.getParam('roupa');
        const cliente = this.props.navigation.getParam('cliente');
        const clienteOid = this.props.navigation.getParam('clienteOid');
        const lavagemOid = this.props.navigation.getParam('lavagemOid');

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
        }else{
            if(tiposArray.length > 0){
                tipo = tiposArray[0].nome;
                tipoOid = tiposArray[0].oid;
            }

            if(tamanhosArray.length > 0){
                tamanhosArray = [{oid: 1, nome: ''}, ...tamanhosArray];
            }

            if(tecidosArray.length > 0){
                tecidosArray = [{oid: 1, nome: ''}, ...tecidosArray];
            }

            if(marcasArray.length > 0){
                marcasArray = [{oid: 1, nome: ''}, ...marcasArray];
            }

            if(coresArray.length > 0){
                coresArray = [{oid: 1, nome: ''}, ...coresArray];
            }

            this.setState({tipo, tipoOid})
        }

        this.setState({tiposArray, tecidosArray, tamanhosArray, marcasArray, coresArray, cliente, clienteOid, lavagemOid, modalVisible: false});
    }

    async salvar(props) {
        if(this.state.tipo == ''){
            alert('Escolha o tipo.');
            return;
        }

        this.setState({modalVisible: true});

        var usuario = JSON.parse(await AsyncStorage.getItem("@SuaLavanderia:usuario"));//this.getUser();
        var hash = this.hash(usuario);
        var email = usuario.email;

        const roupa = this.props.navigation.getParam('roupa');

        var argumentos = 'clienteOid=' + this.state.clienteOid + '&tipoOid=' + this.state.tipoOid;

        if(this.state.tecido != ''){
            argumentos += '&tecidoOid=' + this.state.tecidoOid;
        }

        if(this.state.tamanho != ''){
            argumentos += '&tamanhoOid=' + this.state.tamanhoOid;
        }

        if(this.state.marca != ''){
            argumentos += '&marcaOid=' + this.state.marcaOid;
        }

        if(this.state.cores != ''){
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
        this.setState({ coresSelecionadas });
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.salvar(this.props)} style={styles.button}>
                        <Image style={styles.icon} source={require('../../images/salvar_32x32.png')} />
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    <View style={styles.objetoContainer}>
                        <Text style={styles.valorInfoTitle}>Oid: {this.state.oid}</Text>

                        <Text style={styles.valorInfoTitleCliente}>Cliente: {this.state.cliente}</Text>

                        <Text style={styles.infoTitle}>Tipo: </Text>
                        <Picker
                            style={styles.boxInput}
                            selectedValue={this.state.tipo}
                            onValueChange={(itemValue, itemIndex) => this.setState({tipo: itemValue, tipoOid: itemValue.oid})}>
                            {this.state.tiposArray.map(objeto => 
                                <Picker.Item key={objeto.oid} label={objeto.nome} value={objeto} />    
                            )}
                        </Picker>

                        <Text style={styles.infoTitle}>Tecido: </Text>
                        <Picker
                            style={styles.boxInput}
                            selectedValue={this.state.tecido}
                            onValueChange={(itemValue, itemIndex) => this.setState({tecido: itemValue, tecidoOid: itemValue.oid})}>
                            {this.state.tecidosArray.map(objeto => 
                                <Picker.Item key={objeto.oid} label={objeto.nome} value={objeto} />    
                            )}
                        </Picker>

                        <Text style={styles.infoTitle}>Tamanho: </Text>
                        <Picker
                            style={styles.boxInput}
                            selectedValue={this.state.tamanho}
                            onValueChange={(itemValue, itemIndex) => this.setState({tamanho: itemValue, tamanhoOid: itemValue.oid})}>
                            {this.state.tamanhosArray.map(objeto => 
                                <Picker.Item key={objeto.oid} label={objeto.nome} value={objeto} />    
                            )}
                        </Picker>

                        <Text style={styles.infoTitle}>Marca: </Text>
                        <Picker
                            style={styles.boxInput}
                            selectedValue={this.state.marca}
                            onValueChange={(itemValue, itemIndex) => this.setState({marca: itemValue, marcaOid: itemValue.oid})}>
                            {this.state.marcasArray.map(objeto => 
                                <Picker.Item key={objeto.oid} label={objeto.nome} value={objeto} />    
                            )}
                        </Picker>

                        <Text style={styles.infoTitle}>Cores: </Text>
                        <View style={styles.multiSelect}>
                            <SectionedMultiSelect
                                items={this.state.coresArray} 
                                uniqueKey='oid'
                                selectText='Selecione'
                                confirmText='Confirmar'
                                searchPlaceholderText='Pesquisar'
                                single={true}
                                selectedText='Selecionados'
                                onSelectedItemsChange={this.onCoresChange}
                                selectedItems={this.state.coresSelecionadas}
                                displayKey='nome'
                                colors={{primary: '#333'}}
                            />
                        </View>

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