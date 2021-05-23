import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, ActivityIndicator} from "react-native";
import TestRoom_OneButton from './elements/TestRoom_OneButton'
import {fontBold, h1_5, secondaryColor} from '../StyleConstants';
import TestRoom_NavNextButton from './elements/TestRoom_NavNextButton';
import {getQuestion, sendAnswersAndGetNextQuestion} from '../../actions/questionsAction';
import {sendAnswersAndGetTestResults} from "../../actions/resultsAction";
import TestRoom_Timer from "./elements/TestRoom_Timer";
import TestRoom_SomeButton from "./elements/TestRoom_SomeButton";

class TestRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {start_loading: true, goBack: true}
    }

    componentDidMount() {
        this.props.navigation.addListener('beforeRemove', (e) => {
            if (e.data.action.type === 'GO_BACK') e.preventDefault()
        })
    }

    lastQuestion = () => (this.props.question_number >= this.props.question_count)

    onNextQuestion = () => {
        const question_number = this.props.question_number
        const user_answers = this.props.user_answers[question_number].data
        const test_id = this.props.route.params.test_id
        const question_type = this.props.questionData.data.data.answers_type.split(',')[0]

        if (this.lastQuestion())
            this.props.onSendAnswersAndGetTestResults(question_type, user_answers, test_id, question_number)
        else
            this.props.onSendAnswersAndGetNextQuestion(question_type, user_answers, test_id, question_number)
    }

    _answerButtons = (type, answers, active, test_id) => {
        switch (type) {
            case 'one':
                return Object.entries(answers)
                    .map(([key, value]) =>
                        <TestRoom_OneButton
                            test_id={test_id}
                            id={key}
                            key={key}
                            active={active[key]}>
                            {value}
                        </TestRoom_OneButton>)
            case 'some':
                return Object.entries(answers)
                    .map(([key, value]) =>
                        <TestRoom_SomeButton
                            test_id={test_id}
                            id={key}
                            key={key}
                            active={active[key]}>
                            {value}
                        </TestRoom_SomeButton>)
        }

    }

    render() {
        let answers, title, answers_buttons;

        const test_id = this.props.route.params.test_id
        const question_number = this.props.question_number
        const user_data = this.props.user_answers[question_number]?.data
        const active = user_data || {}
        const question_type = this.props.questionData.data.data.answers_type.split(',')[0]

        if (!this.props.loading && this.props.questionData) {
            answers = this.props.questionData.data.answers
            title = this.props.questionData.data.title
        }

        answers_buttons = this._answerButtons(question_type, answers, active, test_id)

        return (
            <View>
                {this.props.loading ?
                    <ActivityIndicator size="small" color={secondaryColor}/> :
                    <View style={{width: '100%', height: '100%', position: 'relative'}}>
                        <TestRoom_Timer
                            start_time={1000}
                            test_id={test_id}
                            onTimerExpire={this.onNextQuestion}
                            navigation={this.props.navigation}

                        />
                        <Text style={styles.title}>{title}</Text>
                        <View style={styles.content}>
                            <View style={styles.answers_block}>
                                <View style={{flexDirection: 'column', alignSelf: 'center'}}>
                                    {answers_buttons}
                                </View>
                            </View>
                        </View>
                        <View style={{position: 'absolute', bottom: 15, width: '100%'}}>
                            <TestRoom_NavNextButton
                                disable={this.props.answersSendLoading}
                                onPress={this.onNextQuestion}
                                test_id={this.props.route.params.test_id}
                                navigation={this.props.navigation}/>
                        </View>
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    answers_block: {
        width: '100%',
        marginTop: 40,
        justifyContent: 'center',
    },
    content: {
        width: '100%',

        position: 'relative',

    },
    title: {
        marginTop: 20,
        fontSize: h1_5,
        fontFamily: fontBold,
        textAlign: 'center',
    }
})

export default connect(
    state => ({
        questionData: state.question,
        question_number: state.questionNumber,
        question_count: state.questionCount,
        loading: state.questionLoading,
        user_answers: state.userAnswers,
        answersSendLoading: state.answersSendProgress,
    }),
    dispatch => ({
        setDefaultUserAnswers: (answers, test_id, question_id) => dispatch(setDefaultUserAnswers(answers, test_id, question_id)),
        callLoading: () => dispatch({type: 'QUESTION/GET_PROGRESS'}),
        onGetQuestion: (answers, test_id, question_number,) => dispatch(getQuestion(answers, test_id, question_number)),
        onSendAnswersAndGetTestResults: (question_type, answers, test_id, question_number) => dispatch(sendAnswersAndGetTestResults(question_type, answers, test_id, question_number)),
        onSendAnswersAndGetNextQuestion: (question_type, answers, test_id, question_number) => dispatch(sendAnswersAndGetNextQuestion(question_type, answers, test_id, question_number)),
    }))(TestRoom);
