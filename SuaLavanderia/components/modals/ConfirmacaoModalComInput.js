import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Modal } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default class ConfirmacaoModalComInput extends React.Component {

    state = {
        texto: '',
    };

    render(){
        return(
            <Modal visible={this.props.visible} animationType="fade" transparent={true} onRequestClose={() => {}} >
                <View style={styles.container}>
                    <View style={styles.boxContainer}>

                        <View style={styles.infoContainer}>
                            <Text style={styles.infoTitle}>{this.props.texto}</Text>
                        </View>

                        <View style={styles.infoContainer}>
                                <TextInput
                                    style={styles.boxInput}
                                    autoFocus
                                    placeholder={this.props.inputText}
                                    value={this.state.texto}
                                    onChangeText={texto => this.setState({texto})}
                                />
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                onPress={() => this.props.onSim(this.state.texto)} 
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
            margin: 5,
            borderRadius: 5,
            width: '100%',
        },
        infoContainer: {
            flexDirection: 'row',
        },
        infoTitle: {
            fontWeight: 'bold',
            fontSize: 22,
        },
        picker:{
            height: 40,
            width: 100,
            borderRadius: 15,
            padding: 5,
        },
    }
);