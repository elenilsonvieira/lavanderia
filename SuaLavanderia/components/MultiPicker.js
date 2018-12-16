import React from 'react';
import {StyleSheet, View } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

export default class MultiPicker extends React.Component {

    render(){
        return(
            <View style={styles.multiSelect}>
                <SectionedMultiSelect
                    items={this.props.objetos} 
                    uniqueKey='oid'
                    selectText=''
                    confirmText='Confirmar'
                    searchPlaceholderText='Pesquisar'
                    single={this.props.single ? this.props.single : true}
                    selectedText='Selecionados'
                    onSelectedItemsChange={this.props.onSelectedItemsChange}
                    selectedItems={this.props.objetosSelecionados}
                    displayKey='nome'
                    colors={{primary: '#333'}}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create(
    {
        multiSelect: {
            backgroundColor: "#DDD",
            height: 40,
            alignSelf: 'stretch',
        },
    }
);