import React, {Component} from 'react';
import {StyleSheet, TextInput, View} from "react-native";
import {fontLight, fontMedium, fontRegular, lightColor, secondaryColor, secondColor} from "../../StyleConstants";
import {connect} from "react-redux";
import {searchData} from "../../../actions/searchAction";

class SearchRoom_InputField extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    onTextInputChange = (event) => {
        console.log(event.nativeEvent.text.trim().toLowerCase())
        this.props.searchData(event.nativeEvent.text.trim().toLowerCase())
    }

    render() {
        return (
            <View>
                <View style={styles.text_input_container}>
                    <TextInput
                        onChange={(event)=> this.onTextInputChange(event)}
                        autoFocus={true}
                        style={styles.text_input}
                        placeholder={"Введите что-нибудь..."}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text_input_container: {
        fontFamily: fontRegular,
        height: 70,
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    text_input: {
        fontFamily: fontMedium,
        padding:10,
        height: 50,
        borderRadius:5,
        backgroundColor: lightColor,
        // color: '#acacac',
        width: '100%'
    }
})

export default connect(
    state => ({
        search_results: state.search_results
    }),
    dispatch => ({
        searchData: (fragment) => dispatch(searchData(fragment)),
    }))(SearchRoom_InputField);
