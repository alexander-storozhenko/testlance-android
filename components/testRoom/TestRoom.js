import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, ActivityIndicator, ImageBackground} from "react-native";
import TestRoom_OneButton from './elements/buttons/TestRoom_OneButton'
import {borderRadius, fontBold, fontRegular, h1_5, lightColor, secondaryColor} from '../StyleConstants';
import TestRoom_NavNextButton from './elements/buttons/TestRoom_NavNextButton';
import {getQuestion, sendAnswersAndGetNextQuestion} from '../../actions/questionsAction';
import {sendAnswersAndGetTestResults} from "../../actions/resultsAction";
import TestRoom_Timer from "./elements/TestRoom_Timer";
import TestRoom_SomeButton from "./elements/buttons/TestRoom_SomeButton";
import {apiPath, rootPath} from "../../lib/Requests";
import SeparateLine from "../ui/SeparateLine";
import TestRoom_N2NButton from "./elements/buttons/TestRoom_N2NButton";
import TestRoom_N2NAnswers from "./elements/TestRoom_N2NAnswers";
import {anySelectedAnswer, n2nColorMapToAnswers} from "../../lib/TestsHelper";
import TestRoom_BigCountGrid from "./elements/grids/TestRoom_BigCountGrid";
import TestRoom_2Grid from "./elements/grids/TestRoom_2Grid";

const TITLE_BREAK_LENGTH = 20

class TestRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {any_selected: false, start_loading: true, goBack: true}
    }

    componentDidMount() {
        this.props.navigation.addListener('beforeRemove', (e) => {
            if (e.data.action.type === 'GO_BACK')
                e.preventDefault()
        })

        this.props.navigation.addListener('focus', (_) => {
            this.props.setHeader(`${this.props.question_number}/${this.props.question_count}`)
        })
    }

    lastQuestion = () => (this.props.question_number >= this.props.question_count)

    onNextQuestion = () => {
        const question_number = this.props.question_number
        const test_id = this.props.route.params.test_id

        const question_type = this.props.questionData.question.data.data.answers_type.split(',')[0]

        const user_answers = question_type === 'n2n' ?
            n2nColorMapToAnswers(this.props.n2nColorMap) :
            this.props.user_answers[question_number].data

        if (this.lastQuestion())
            this.props.onSendAnswersAndGetTestResults(question_type, user_answers, test_id, question_number)
        else
            this.props.onSendAnswersAndGetNextQuestion(question_type, user_answers, test_id, question_number)
    }

    //TODO check test type
    _answerButtons = (type, answers, active, test_id) => {
        switch (type) {
            case 'one':

                return Object.entries(answers)
                    .map(([key, value]) => <TestRoom_OneButton test_id={test_id} id={key} key={key}
                                                               active={active[key]} image_url={} >{value}</TestRoom_OneButton>)
            case 'some':
                return Object.entries(answers)
                    .map(([key, value]) => <TestRoom_SomeButton test_id={test_id} id={key} key={key}
                                                                active={active[key]}>{value}</TestRoom_SomeButton>)
            case 'n2n':
                return <TestRoom_N2NAnswers answers={answers} active={active} test_id={test_id}/>
        }
    }

    renderImageQuestion = () => {
        const image_url = this.props.questionData.title_image_url
        if (image_url) {
            return (
                <View style={{width: '100%', height: 200, borderRadius: borderRadius}}>
                    <ImageBackground style={styles.image} source={{uri: rootPath(image_url)}}/>
                </View>
            )
        }
    }

    render() {
        let answers, question_type, title

        const test_id = this.props.route.params.test_id
        const question_number = this.props.question_number
        const user_data = this.props.user_answers[question_number]?.data
        const active = user_data || {}
        const questionData = this.props.questionData?.question.data

        if (!this.props.loading && questionData) {
            answers = questionData.answers
            title = questionData.title
            question_type = questionData.data.answers_type.split(',')[0]
        }

        const answerButtons = this._answerButtons(question_type, answers, active, test_id)

        const resultAnswerButtons =
            answerButtons.length > 2 ?
                <TestRoom_BigCountGrid>{answerButtons}</TestRoom_BigCountGrid> :
                <TestRoom_2Grid>{answerButtons}</TestRoom_2Grid>

        return (
            <View>
                {this.props.loading ?
                    <ActivityIndicator size="small" color={secondaryColor}/> :
                    <View style={{width: '100%', height: '100%', position: 'relative'}}>
                        <View style={{alignItems: 'flex-end'}}>
                            <TestRoom_Timer
                                start_time={3000}
                                test_id={test_id}
                                onTimerExpire={this.onNextQuestion}
                                navigation={this.props.navigation}

                            />
                        </View>

                        <Text style={[styles.title,
                            {
                                textAlign: title.length > TITLE_BREAK_LENGTH ? null :'center',
                                fontFamily: title.length > TITLE_BREAK_LENGTH ? fontRegular : fontBold,
                            }
                            ]}>
                            {title}
                        </Text>

                        {this.renderImageQuestion()}

                        <View style={styles.content}>

                            <View style={styles.answers_block}>

                                {/*<View style={{flexDirection: 'column', alignSelf: 'center'}}>*/}
                                    {resultAnswerButtons}
                                {/*</View>*/}
                            </View>
                        </View>
                        <View style={{position: 'absolute', bottom: 50, width: '100%'}}>

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
        marginTop: 20,
        justifyContent: 'center',
    },
    content: {
        width: '100%',

        position: 'relative',

    },
    title: {
        marginTop: 5,
        fontSize: h1_5,
        fontFamily: fontRegular,
    },
    image: {
        marginTop: 10,
        width: '100%',
        height: 200,
        resizeMode: 'contain',

    },
})

export default connect(
    state => ({
        questionData: state.question,
        question_number: state.questionNumber,
        question_count: state.questionCount,
        loading: state.questionLoading,
        user_answers: state.userAnswers,
        answersSendLoading: state.answersSendProgress,
        headerTitle: state.headerTitle,
        n2nColorMap: state.answersColorN2NMap
    }),
    dispatch => ({
        setDefaultUserAnswers: (answers, test_id, question_id) => dispatch(setDefaultUserAnswers(answers, test_id, question_id)),
        callLoading: () => dispatch({type: 'QUESTION/GET_PROGRESS'}),
        setHeader: (text) => dispatch({type: 'HEADER/SET', payload: {text: text}}),
        onGetQuestion: (answers, test_id, question_number,) => dispatch(getQuestion(answers, test_id, question_number)),
        onSendAnswersAndGetTestResults: (question_type, answers, test_id, question_number) => dispatch(sendAnswersAndGetTestResults(question_type, answers, test_id, question_number)),
        onSendAnswersAndGetNextQuestion: (question_type, answers, test_id, question_number) => dispatch(sendAnswersAndGetNextQuestion(question_type, answers, test_id, question_number)),
    }))(TestRoom);
