import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
    StyleSheet,
} from "react-native";
import {
    h3,
    primaryColor,
    secondaryColor
} from '../../StyleConstants';
import TextColorPicker_Button from "./textColorPicker_elements/TextColorPicker_Button";

class MainInfoScreen_TextColorPicker extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const btns = [
            <TextColorPicker_Button key={0} id={0} color={secondaryColor}/>,
            <TextColorPicker_Button key={1} id={1} color={primaryColor} border={secondaryColor}/>,
        ]

        return (
            <View style={styles.container}>
                <Text style={styles.text}>Цвет текста: </Text>
                <View style={styles.btns_container}>{btns}</View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flexDirection: 'row',
        alignItems:'center',
    },
    text:{
        fontSize: h3,

    },
    btns_container:{
        marginLeft: 10,
        width: 110,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between'
    }
})

export default connect(
    null,
    dispatch => ({
        onSetTestTemplateData: (data) => dispatch({ type: 'TEST/SET_TEST_T_DATA', payload: data }),
    })
)(MainInfoScreen_TextColorPicker);
