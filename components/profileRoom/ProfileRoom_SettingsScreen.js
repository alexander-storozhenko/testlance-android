import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, View, Image, Text, StyleSheet, Dimensions, ActivityIndicator, TouchableWithoutFeedback} from "react-native";
import Logo from '../../assets/dev_logo.jpg'
import {
    contrastColor,
    fontBold,
    h3,
    h2,
    h4,
    primaryColor,
    secondColor,
    lightColor,
    borderRadius, roomPadding
} from "../StyleConstants";
import Switch from "../switch/Switch";
import {backHeader} from "../../actions/headerActions";

class ProfileRoom_SettingsScreen extends Component {
    componentDidMount() {
        this.props.onBack(true)
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.box_container}>
                    <View style={styles.box_row}>
                        <Text style={styles.box_row_text}>Звуки/эффекты</Text>
                        <Switch actionOn={() => console.log('on!')} actionOff={() => console.log('off!')}/>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: roomPadding,
        paddingBottom: roomPadding,
        width: '100%',
        flex: 1,
        position: 'relative',
        backgroundColor: lightColor,
        alignItems: 'center'
    },
    close_btn_container:{
        position: 'absolute',
        top: 10,
        right: 10,
        width:20,
        height:20,
    },
    close_btn:{
        width:20,
        height:20,
    },
    box_container: {
        flex: 1,
        width: '100%',
        backgroundColor: lightColor,
        borderRadius: borderRadius,
        borderWidth: 2,
        borderColor: secondColor,
        flexDirection: 'row',
        alignItems: 'center'
    },
    box_row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center'
    },
    box_row_text:{
      fontSize: h3,
        paddingRight: 30,
    },
    sep: {
        width: 2,
        height: '100%',
        backgroundColor: secondColor,
        marginLeft: 8,
        marginRight: 8,
    },
    status: {
        color: contrastColor,
        fontSize: h3
    }

})

export default connect(state => ({
    navigation: state.currentNavigation
}), dispatch => ({
    onBack: (show)=> dispatch(backHeader(show))
}))(ProfileRoom_SettingsScreen);
