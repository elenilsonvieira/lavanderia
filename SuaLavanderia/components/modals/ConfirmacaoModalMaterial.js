import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Modal, Picker } from 'react-native';

export default class ConfirmacaoModalMaterial extends React.Component {

    state = {
        quantidade: '1',
        modo: 'saida',
    };

    render(){
        return(
            <Modal visible={this.props.visible} animationType="fade" transparent={true} onRequestClose={() => {}} >
                <View style={styles.container}>
                    <View style={styles.boxContainer}>

                        <View style={styles.infoContainer}>
                            <TextInput
                                style={styles.boxInput}
                                autoFocus
                                placeholder="Quantidade"
                                value={this.state.quantidade}
                                onChangeText={quantidade => this.setState({quantidade})}
                            />
                        </View>

                        <View style={styles.infoContainer}>
                            <Picker
                                style={styles.picker}
                                selectecValue={this.state.modo}
                                onValueChange={(itemValue, itemIndex) => this.setState({modo: itemValue})}>
                                <Picker.Item label='Saída' value='saida' />
                                <Picker.Item label='Entrada' value='entrada' />
                            </Picker>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                onPress={() => this.props.onSim(this.state.quantidade, this.state.modo)} 
                                style={[styles.button, styles.buttonAdd]}>
                                <Text style={styles.buttonText}>Confirmar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.props.onNao} style={[styles.button, styles.buttonCancel]}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

}

const styles = StyleSheet.create(
    {
        container: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
        },
        buttonAdd: {
            backgroundColor: '#33cc00',
        },
        buttonCancel: {
            backgroundColor: '#ff9999',
        },
        button:{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            margin: 10,
            padding: 20,
        },
        buttonText: {
            fontWeight: 'bold',
            color: '#FFF',
        },
        buttonContainer: {
            flexDirection: 'row',
            marginTop: 10,
            height: 70,
        },
        boxContainer: {
            borderRadius: 10,
            backgroundColor: "#FFF",
            alignItems: 'center',
            justifyContent: 'center',
            margin: 20,
        },
        boxInput:{
            backgroundColor: "#DDD",
            alignSelf: "stretch",
            height: 40,
            width: '100%',
            margin: 5,
            borderRadius: 5,
        },
        infoContainer: {
            flexDirection: 'row',
        },
        infoTitle: {
            fontWeight: 'bold',
        },
        picker:{
            height: 40,
            width: '100%',
            borderRadius: 15,
            padding: 5,
        },
    }
);