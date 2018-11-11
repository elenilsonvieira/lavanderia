import React from 'react';
import { StyleSheet, View, Text, Modal, ActivityIndicator } from 'react-native'

export default class LoadingModal extends React.Component {

    render(){
        return(
            <Modal visible={this.props.modalVisible} animationTYpe="fade" transparent={true} onRequestClose={ ()=> {}}>
                <View style={styles.container}>
                    <View style={styles.boxContainer}>
                        <ActivityIndicator size="large" />  
                        <View>
                            <Text style={styles.text}>{this.props.text ? this.props.text : "Aguarde..."}</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    boxContainer: {
        margin: 20,
        borderRadius: 10,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 100,
    },
    text: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        padding: 10,
    }
});