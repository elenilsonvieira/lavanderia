import React from 'react';
import {StyleSheet, View } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

export default class MultiPicker extends React.Component {

    render(){
        return(
            <View style={this.props.multiplaEscolha ? styles.multiSelectMultiple : styles.multiSelectSingle}>
                <SectionedMultiSelect
                    items={this.props.objetos} 
                    uniqueKey='oid'
                    selectText=''
                    confirmText='Confirmar'
                    searchPlaceholderText='Pesquisar'
                    single={this.props.multiplaEscolha ? !this.props.multiplaEscolha : true}
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
        multiSelectSingle: {
            backgroundColor: "#DDD",
            height: 40,
            alignSelf: 'stretch',
        },
        multiSelectMultiple: {
            backgroundColor: "#DDD",
            minHeight: 40,
            alignSelf: 'stretch',
        },
    }
);