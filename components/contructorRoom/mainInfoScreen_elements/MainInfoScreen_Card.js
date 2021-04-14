import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    View,
    StyleSheet,
    TextInput
} from "react-native";
import {
    fontBold,
    h3,
    h4,
    borderRadius
} from '../../StyleConstants';
import {ImageBackground} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import {getTextColor} from "../../../lib/ColorsHelper";
import Card_ImageButton from "./card_elements/Card_ImageButton";
import * as ImagePicker from 'expo-image-picker';

class MainInfoScreen_Card extends Component {
    constructor(props) {
        super(props)
    }

    onLoadImage = async () => {
        let image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 2.1],
            quality: 1,
        })

        if(!image.cancelled)
            this.props.onStoreImg(image.uri)
    }

    render() {
        return (
            <View style={styles.card}>
                {this.props.image ?
                    <View style={styles.img_container}>
                        <ImageBackground style={styles.image} source={{uri: this.props.image }}/>
                    </View> : null}
                <LinearGradient style={styles.gradient} colors={[this.props.first_color, this.props.second_color]}>
                    <View style={styles.card_content}>
                        <View>
                            <TextInput placeholder={'Название...'}
                                       onChangeText={text =>this.props.onChangeTitle(text)}
                                       style={[{color: getTextColor(this.props.first_color)}, styles.input, styles.input_title]}/>
                        </View>
                        <View style={styles.description}>
                            <TextInput placeholder={'Описание...'}
                                       onChangeText={text =>this.props.onChangeSubTitle(text)}
                                       style={[{color: getTextColor(this.props.first_color)},styles.input, styles.input_description]}/>
                        </View>
                    </View>
                    <View style={styles.img_btn}>
                        <Card_ImageButton onPress={this.onLoadImage}/>
                    </View>
                </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        height: 190,
        maxWidth: 380,
        marginTop: 15,
        borderRadius: borderRadius,
    },
    card_content: {
        width: '100%',
        height: '100%',
        padding: 10,
    },
    input: {
        width: 200,
        height: 40,
    },
    input_title:{
        fontFamily: fontBold,
        fontSize: h3
    },
    input_description:{
        fontSize: h4,
        width: 300,
    },
    gradient: {
        width: '100%',
        height: '100%',
        borderRadius: borderRadius,
        opacity: 0.83,
    },
    description:{
        paddingTop: 10,
    },
    img_btn:{
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',

    },
    img_container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        borderRadius: borderRadius,
        overflow: 'hidden'
    }

})

export default connect(
    state => ({
        first_color: state.constructorCarouselFirstColorBtnClicked.color,
        second_color: state.constructorCarouselSecondColorBtnClicked.color,
        image: state.constructorCardImage,
    }),
    dispatch => ({
        onChangeTitle: (title) => dispatch({type: 'CONSTRUCTOR/CARD/TITLE', payload: title}),
        onChangeSubTitle: (sub_title) => dispatch({type: 'CONSTRUCTOR/CARD/SUB_TITLE', payload: sub_title}),
        onStoreImg: (uri) => dispatch({type: 'CONSTRUCTOR/CARD/STORE_IMG', payload: uri})
    })
)(MainInfoScreen_Card);
