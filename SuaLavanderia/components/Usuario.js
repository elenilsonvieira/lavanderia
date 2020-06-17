import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Usuario extends React.Component {

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.objetoContainer}>
                    <View style={styles.objetoInfoContainer}>
                        <Text style={styles.objetoInfoTitle}>{this.props.objeto.nome}</Text>
                    </View>

                    <View style={styles.valorInfoContainer}>
                        <Text style={styles.valorInfoTitle}>Papel: </Text>
                        <Text style={styles.tipoInfo}>{this.props.objeto.papel}</Text>
                    </View>

                    <View style={styles.valorInfoContainer}>
                        <Text style={styles.valorInfoTitle}>Email: </Text>
                        <Text style={styles.tipoInfo}>{this.props.objeto.email}</Text>
                    </View>

                    <View style={styles.valorInfoContainer}>
                        <Text style={styles.valorInfoTitle}>Código: </Text>
                        <Text style={styles.tipoInfo}>{this.props.objeto.codigo}</Text>
                    </View>

                    <View style={styles.valorInfoContainer}>
                        <Text style={styles.valorInfoTitle}>VIP Club: </Text>
                        <Text style={styles.tipoInfo}>{this.props.objeto.vipClub}</Text>
                    </View>

                    <View style={styles.valorInfoContainer}>
                        <Text style={styles.valorInfoTitle}>Unidade Padrão: </Text>
                        <Text style={styles.tipoInfo}>{this.props.objeto.unidade}</Text>
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
            justifyContent: 'space-between',
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
        objetoContainer: {
            borderRadius: 5,
            backgroundColor: '#FFF',
            padding: 20,
            margin: 20,
            justifyContent: 'center',
        },
        objetoInfoContainer: {
            alignItems: 'center',
        },
        valorInfoContainer: {
            flexDirection: 'row',
        },
        objetoInfoTitle: {
            fontSize: 25,
            fontWeight: 'bold',
        },
        valorInfoTitle: {
            fontWeight: 'bold',
        },
        tipoInfo: {
        },
        button:{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            margin: 10,
            padding: 10,
            backgroundColor: '#DDD',
        },
    }
);