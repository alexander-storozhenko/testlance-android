import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet} from "react-native";
import {checkedColor, contrastColor, fontBold, h2, primaryColor} from '../../../StyleConstants';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {storeUserAnswer} from "../../../../actions/answersAction";

class TestRoom_SomeButton extends Component {
    constructor(props) {
        super(props)
        this.state = {pressed: false}
    }

    onClick = () => {
        if (!this.props.answersSendLoading) {
            this.setState({pressed: !this.state.pressed})
            this.props.storeAnswers('some', !this.state.pressed, this.props.id, this.props.test_id, this.props.question_number)
        }
    }

    render() {
        const backgroundColor = this.state.pressed ? checkedColor : '#efd4a7'
        return (
            <View style={{marginTop: 15}}>
                <TouchableWithoutFeedback onPress={() => this.onClick()}
                                          style={{...styles.button, backgroundColor: backgroundColor}}>
                    <Text style={styles.button_text}>{this.props.children}</Text>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: 300,
        minHeight: 60,
        borderRadius: 10,
        elevation: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button_text: {
        color: primaryColor,
        fontFamily: fontBold,
        fontSize: h2,
    }
})

export default connect(
    state => ({
        question_number: state.questionNumber,
        user_answers: state.userAnswers,
        answersSendLoading: state.answersSendProgress,
    }),
    dispatch => ({
        storeAnswers: (type, value, answer_id, test_id, question_number) =>
            dispatch(storeUserAnswer(type, value, answer_id, test_id, question_number))
    }))(TestRoom_SomeButton);
