import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    View,
    StyleSheet,
} from "react-native";
import ColorsPage_RoundButtonFirstColor from "./ColorsPage_RoundButtonFirstColor";
import ColorsPage_RoundButtonSecondColor from "./ColorsPage_RoundButtonSecondColor";

class ColorsPage_ColorPicker extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.first_color_row}>
                    <ColorsPage_RoundButtonFirstColor id={0} color={'#12faaf'}/>
                    <ColorsPage_RoundButtonFirstColor id={1} color={'#521236'}/>
                </View>

                <View style={styles.second_color_row}>
                    <ColorsPage_RoundButtonSecondColor id={0} color={'#8f5376'}/>
                    <ColorsPage_RoundButtonSecondColor id={1} color={'#cba42a'}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
    },
    btns: {
        flexDirection: 'row',
    },
    first_color_row:{
        marginLeft:-10,
        width: '100%',
        flexDirection: 'row',
        justifyContent:'center'
    },
    second_color_row:{
        marginLeft:-10,
        marginTop:20,
        width: '100%',
        flexDirection: 'row',
        justifyContent:'center'
    }
})

export default connect(
    null,
    dispatch => ({})
)(ColorsPage_ColorPicker);
