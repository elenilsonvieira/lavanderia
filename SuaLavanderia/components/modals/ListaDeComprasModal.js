import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Modal } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Picker} from '@react-native-picker/picker';

export default class ListaDeComprasModal extends React.Component {

    state = {
        quantidade: '1',
        status: 'saida',
        data: '',
        dataPickerVisible: false,
    };

    componentDidMount(){
        var hoje = new Date();
        var mes = hoje.getMonth() + 2;
        if(mes < 10){
            mes = '0' + mes;
        }

        var dia = hoje.getDate();
        if(dia < 10){
            dia = '0' + dia;
        }

        var data = dia + '/' + mes + '/' + hoje.getFullYear();

        this.setState({data});
    }

    dataEscolhida = (dataEscolhida) => {
        //var dataEscolhidaString = dataString(dataEscolhida);

        var dia = dataEscolhida.getDate();
        var mes = dataEscolhida.getMonth() + 1;

        if(dia < 10){
            dia = '0' + dia;
        }

        if(mes < 10){
            mes = '0' + mes;
        }

        var dataEscolhidaString = dia + '/' + mes + '/' + dataEscolhida.getFullYear();

        this.setState({ 
            dataPickerVisible: false,
            data: dataEscolhidaString,
        });
    }

    render(){
        return(
            <Modal visible={this.props.visible} animationType="fade" transparent={true} onRequestClose={() => {}} >
                <View style={styles.container}>
                    <View style={styles.boxContainer}>

                        <View style={styles.infoContainer}>
                            <Text style={styles.boxDate}>Durar até: </Text>
                            
                            <TouchableOpacity onPress={() => this.setState({dataPickerVisible: true})}>
                                <Text style={styles.boxDate}>{this.state.data}</Text>
                            </TouchableOpacity>
                            
                            <DateTimePickerModal 
                                mode="date"
                                isVisible={this.state.dataPickerVisible}
                                onConfirm={this.dataEscolhida}
                                onCancel={() => this.setState({dataPickerVisible: false})}
                            />
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                onPress={() => this.props.onSim(this.state.data)} 
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
        infoTitleDate: {
            height: 40,
            fontWeight: 'bold',
            fontSize: 20,
        },
        boxDate:{
            height: 40,
            borderRadius: 5,
            padding: 5,
            paddingTop: 10,
            justifyContent: 'center',
            fontSize: 20,
            fontWeight: 'bold',
        },
    }
);