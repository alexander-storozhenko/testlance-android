import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, View, StyleSheet, Dimensions} from "react-native";
import {headerHeight, navHeight, roomPadding, tabHeight} from '../StyleConstants';

class Room extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const screenHeight = Dimensions.get('window').height;
        const height = this.props.full ? screenHeight - roomPadding * 2 : screenHeight - tabHeight - roomPadding * 2

        return (
            <View style={[styles.room, {height:height}]}>
                {this.props.children}
            </View>
        );
    }
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    room: {
        padding: roomPadding,
        paddingTop: 0,
        paddingBottom: 0,
        width: width,
        justifyContent: 'center',
        flexDirection: 'row',
        overflow: 'visible'
    },
})

export default Room;