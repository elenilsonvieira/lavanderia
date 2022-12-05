import { Text as ReactText, StyleSheet } from "react-native";

export default function Text(props){
    return(
        <ReactText style={[styles.mudarCor, props.style]}>{props.children}</ReactText>
    )
}

const styles = StyleSheet.create(
    {
        mudarCor: {
            color: 'black',
        },
    }
);