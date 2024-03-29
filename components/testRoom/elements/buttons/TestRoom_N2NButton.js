import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet} from "react-native";
import {checkedColor, contrastColor, fontBold, h2, primaryColor} from '../../../StyleConstants';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {selectN2NBtn, storeUserAnswer} from "../../../../actions/answersAction";

class TestRoom_N2NButton extends Component {
    constructor(props) {
        super(props)
        this.state = {pressed: false}
    }

    onClick = () => {
        if (!this.props.answersSendLoading) {
            this.setState({pressed: !this.state.pressed})
            this.props.onClick()
            this.props.storeAnswers('n2n', !this.props.active, this.props.id, this.props.test_id, this.props.question_number)
        }
    }

    render() {
        return (
            <View style={{marginTop: 15}}>
                <TouchableWithoutFeedback onPress={() => this.onClick()}
                                          style={{...styles.button, backgroundColor: this.props.backgroundColor ?? contrastColor}}>
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
        colorMap: state.answersColorN2NMap,
    }),
    dispatch => ({
        selectBtn: (answer_id, pos, answers_color_map) => dispatch(selectN2NBtn(answer_id, pos, answers_color_map)),
        storeAnswers: (type, value, answer_id, test_id, question_number) =>
            dispatch(storeUserAnswer(type, value, answer_id, test_id, question_number))
    }))(TestRoom_N2NButton);
