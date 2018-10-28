import React from 'react';
import {StyleSheet, View, Picker, Image, Text, TextInput, TouchableOpacity } from 'react-native';

export default class RoupaEmLavagemDetails extends React.Component {

    state ={
        quantidade: '1',
        soPassar:  false,
        observacoes: '',
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.button}>
                        <Image style={styles.icon} source={require('../../images/salvar_32x32.png')} />
                    </TouchableOpacity>
                </View>

                <View style={styles.unidadeContainer}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoTitle}>Quantidade: </Text>
                            <TextInput
                                style={styles.boxInput}
                                autoFocus
                                value={this.state.title}
                                onChangeText={quantidade => this.setState({quantidade})}
                            />
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.infoTitle}>Só Passar?: </Text>
                        <Picker
                            style={styles.picker}
                            selectecValue={this.state.soPassar}
                            onValueChange={(itemValue, itemIndex) => this.setState({soPassar: itemValue})}>
                            <Picker.Item label='Não' value={false} />
                            <Picker.Item label='Sim' value={true} />
                        </Picker>
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.infoTitle}>Observações: </Text>
                        <TextInput
                            style={styles.boxInput}
                            placeholder="Observações"
                            value={this.state.observacoes}
                            onChangeText={observacoes => this.setState({observacoes})}
                        />
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
        picker:{
            height: 40,
            width: 100,
            borderRadius: 15,
            padding: 5,
        },
    }
);