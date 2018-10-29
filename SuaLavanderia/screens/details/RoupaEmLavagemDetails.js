import React from 'react';
import {StyleSheet, View, Picker, Image, Text, TextInput, TouchableOpacity } from 'react-native';

export default class RoupaEmLavagemDetails extends React.Component {

    state ={
        quantidade: '1',
        soPassar:  false,
        observacoes: '',
        chave: '',
        roupa: {},
        clienteOid: '',
        lavagemOid: '',
        oid: '',
    };

    componentDidMount(){
        var roupaEmLavagem = this.props.navigation.getParam('roupaEmLavagem');

        if(roupaEmLavagem != null){
            const quantidade = roupaEmLavagem.quantidade.toString();
            const soPassar = roupaEmLavagem.soPassar;
            const observacoes = roupaEmLavagem.observacoes;
            const chave = roupaEmLavagem.roupa.chave;
            const roupa = roupaEmLavagem.roupa;
            const oid = roupaEmLavagem.oid;

            this.setState({quantidade, soPassar, observacoes, chave, roupa, oid});
        }

        const clienteOid = this.props.navigation.getParam('clienteOid');
        const lavagemOid = this.props.navigation.getParam('lavagemOid');

        this.setState({lavagemOid, clienteOid});
    }

    async salvar(props) {
        var argumentos = `roupaOid=${this.state.roupa.oid}&lavagemOid=${this.state.lavagemOid}&quantidade=${this.state.quantidade}&soPassar=${this.state.soPassar}&observacoes=${this.state.observacoes}`;
        const novo = this.state.oid == '';

        if(!novo){
            argumentos += `&oid=${this.state.oid}`;
        }

        const call = await fetch(`http://painel.sualavanderia.com.br/api/AdicionarRoupaEmLavagem.aspx?${argumentos}`, 
            { 
                method: 'post' 
            }).then(function(response){
                alert(novo ? 'Adicionado com sucesso!' : 'Alterado com sucesso!');
                props.navigation.goBack();
            }
            ).catch(function(error){
                alert('Erro adicionando/alterando roupa em lavagem.' + error);    
            });
    }

    buscar = async () => {
        const roupaCall = await fetch(`http://painel.sualavanderia.com.br/api/BuscarRoupa.aspx?oid=${this.state.chave}`);

        const response = await roupaCall.json();
        var roupaResponse = response[0];

        const roupa = {
            tipo: roupaResponse.Tipo,
            tecido: roupaResponse.Tecido,
            tamanho: roupaResponse.Tamanho,
            marca: roupaResponse.Marca,
            observacao: roupaResponse.Observacao,
            codigo: roupaResponse.Codigo,
            chave: roupaResponse.Chave,
            cliente: roupaResponse.Cliente,
            clienteOid: roupaResponse.ClienteOid,
            oid: roupaResponse.Oid,
        };

        if(this.state.clienteOid == roupa.clienteOid){
            this.setState({roupa});
        }else{
            alert('Essa roupa não pertece ao dono da Lavagem');
        }
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.salvar(this.props)} style={styles.button}>
                        <Image style={styles.icon} source={require('../../images/salvar_32x32.png')} />
                    </TouchableOpacity>
                </View>

                <View style={styles.unidadeContainer}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoTitle}>Quantidade:  </Text>
                            <TextInput
                                style={styles.boxInput}
                                autoFocus
                                keyboardType='numeric'
                                value={this.state.quantidade}
                                onChangeText={quantidade => this.setState({quantidade})}
                            />
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.infoTitlePicker}>Só Passar?: </Text>
                        <Picker
                            style={styles.picker}
                            selectedValue={this.state.soPassar}
                            onValueChange={(itemValue, itemIndex) => this.setState({soPassar: itemValue})}>
                            <Picker.Item label='Não' value={false} />
                            <Picker.Item label='Sim' value={true} />
                        </Picker>
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.infoTitle}>Observações: </Text>
                        <TextInput
                            style={styles.boxInput}
                            value={this.state.observacoes}
                            onChangeText={observacoes => this.setState({observacoes})}
                        />
                    </View>
                </View>

                <View style={styles.unidadeContainerRoupa}>
                    <View style={styles.roupaContainer}>
                        <Text style={styles.roupasTitle}>Roupa</Text>
                    </View>

                    <View style={styles.infoContainer}>
                        <TextInput
                            style={styles.boxInputChave}
                            value={this.state.chave}
                            placeholder='Chave'
                            onChangeText={chave => this.setState({chave})}
                        />
                        <TouchableOpacity onPress={this.buscar} style={styles.button}>
                            <Image style={styles.icon} source={require('../../images/pesquisar_32x32.png')} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.roupaInfoContainer}>
                        <Text style={styles.roupaInfoTitle}>Chave: </Text>
                        <Text style={styles.roupaInfo}>{this.state.roupa.chave}</Text>
                    </View>

                    <View style={styles.roupaInfoContainer}>
                        <Text style={styles.roupaInfoTitle}>Cliente: </Text>
                        <Text style={styles.roupaInfo}>{this.state.roupa.cliente}</Text>
                    </View>

                    <View style={styles.roupaInfoContainer}>
                        <Text style={styles.roupaInfoTitle}>Tipo: </Text>
                        <Text style={styles.roupaInfo}>{this.state.roupa.tipo}</Text>
                    </View>

                    <View style={styles.roupaInfoContainer}>
                        <Text style={styles.roupaInfoTitle}>Tecido: </Text>
                        <Text style={styles.roupaInfo}>{this.state.roupa.tecido}</Text>
                    </View>

                    <View style={styles.roupaInfoContainer}>
                        <Text style={styles.roupaInfoTitle}>Tamanho: </Text>
                        <Text style={styles.roupaInfo}>{this.state.roupa.tamanho}</Text>
                    </View>

                    <View style={styles.roupaInfoContainer}>
                        <Text style={styles.roupaInfoTitle}>Marca: </Text>
                        <Text style={styles.roupaInfo}>{this.state.roupa.marca}</Text>
                    </View>

                    <View style={styles.roupaInfoContainer}>
                        <Text style={styles.roupaInfoTitle}>Cores: </Text>
                        <Text style={styles.roupaInfo}>{this.state.roupa.cores}</Text>
                    </View>

                    <View style={styles.roupaInfoContainer}>
                        <Text style={styles.roupaInfoTitle}>Código: </Text>
                        <Text style={styles.roupaInfo}>{this.state.roupa.codigo}</Text>
                    </View>

                    <View style={styles.roupaInfoContainer}>
                        <Text style={styles.roupaInfoTitle}>Observação: </Text>
                        <Text style={styles.roupaInfo}>{this.state.roupa.observacao}</Text>
                    </View>
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
            padding: 5,
            width: 170,
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
        infoContainer: {
            flexDirection: 'row',
        },
        lavagemInfoContainerCliente: {
            alignItems: 'center',
        },
        infoTitle: {
            fontWeight: 'bold',
            margin: 10,
        },
        infoTitlePicker: {
            fontWeight: 'bold',
            margin: 10,
            paddingTop: 10,
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
        roupaContainer: {
            alignItems: 'center',
            borderRadius: 5, 
            margin: 10,
        },
        roupasTitle: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        picker:{
            height: 40,
            width: 100,
            borderRadius: 15,
            padding: 5,
            margin: 10,
        },
        roupasContainer: {
            alignItems: 'center',
            backgroundColor: '#F8F8F8',
            borderRadius: 5, 
            marginLeft: 20,
            marginRight: 20,
        },
        roupaInfoContainer: {
            flexDirection: 'row',
        },
        roupaInfoTitle: {
            fontWeight: 'bold',
        },
        roupaInfo: {
        },
        boxInputChave:{
            backgroundColor: "#DDD",
            height: 40,
            borderRadius: 5,
            alignSelf: 'stretch',
            padding: 5,
            width: 250,
        },
        unidadeContainerRoupa: {
            borderRadius: 5,
            backgroundColor: '#FFF',
            padding: 10,
            marginLeft: 20,
            marginRight: 20,
            justifyContent: 'center',
        },
    }
);