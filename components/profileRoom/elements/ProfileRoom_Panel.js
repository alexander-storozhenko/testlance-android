import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, View, Image, Text, StyleSheet, Dimensions, ActivityIndicator} from "react-native";
import Logo from '../../../assets/dev_logo.jpg'
import {fontBold, h1_5,h3, secondColor} from "../../StyleConstants";
import {TouchableNativeFeedback} from "react-native-web";
import {changeSlide} from "../../../actions/profileActions/profileCarouselAction";
// import Panel_Button from "./carousel_elements/Panel_Button";

class ProfileRoom_Panel extends Component {
    componentDidMount() {
        changeSlide(0)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.title}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 5,
        width: '100%',
        height: 50,
    },
    content: {
        width: '100%',
        position: 'relative',
    },
    title: {
        // marginBottom:20,
        fontSize: h3,
    }

})

export default connect(
    state => ({
        title: state.profileCarouselSlideTitle,
    }),
    dispatch => ({
        changeSlide: (index)=> dispatch(changeSlide(index)),

    }))(ProfileRoom_Panel);