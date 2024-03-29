import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, ActivityIndicator} from "react-native";
import TestPreviewRoom_Card from './elements/TestPreviewRoom_Card'
import {fontBold, h2, mt_30, mt_10, secondaryColor} from '../StyleConstants';
import {showNavBar} from '../../actions/navBarAction';
import {getPreviewInfo} from '../../actions/testsAction';
import {getQuestion, resetQuestionNumber} from "../../actions/questionsAction";
import TestPreviewRoom_StartButton from "./elements/TestPreviewRoom_StartButton";
import {setNavigation} from "../../actions/navigationAction";

class TestPreviewRoom extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', (e) => {
            this.props.setHeader('...')
        })
        this.props.resetQuestionNumber()
        this.props.onGetPreviewInfo(this.props.testTData.test_t_id)
    }

    render() {
        const data = this.props.previewInfo?.data
        const options = data?.options

        // need to get data before set title in header

        this.props.setHeader(this.props.previewInfo?.data?.title)

        return (
            <View>
                {
                    this.props.loading ?
                        <View style={styles.activity_indicator_container}>
                            <ActivityIndicator size="large" color={secondaryColor}/>
                        </View> :
                        <View style={styles.preview}>
                            <Text style={styles.title}>{data?.title}</Text>
                            <View style={{...mt_10, width: '100%'}}>
                                <TestPreviewRoom_Card
                                    question_count={options?.question_count}
                                    author_name={options?.author_name}
                                />
                            </View>
                            <View style={{width: '100%', position: 'absolute', bottom: 50}}>
                                <TestPreviewRoom_StartButton
                                    onPress={() => this.props.onGetQuestion(this.props.previewInfo.test_id, 1)}>
                                    Start!
                                </TestPreviewRoom_StartButton>
                            </View>
                        </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    preview: {
        position: 'relative',
        height: "100%",
        backgroundColor: "white",
        alignItems: 'center',
        width: '100%',
    },
    title: {
        ...mt_30,
        fontSize: h2,
        fontFamily: fontBold,
        color: secondaryColor,
    },
    activity_indicator_container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default connect(
    state => ({
        previewInfo: state.testPreviewInfo,
        loading: state.testPreviewLoading,
        testTData: state.testTData,
        question_number: state.questionNumber,
    }),
    dispatch => ({
        onIncreaseQuestionNumber: () => dispatch({type: 'QUESTION/INCREASE_NUMBER'}),
        onGetPreviewInfo: (test_t_id) => dispatch(getPreviewInfo(test_t_id)),
        onShowNavBar: (state) => dispatch(showNavBar(state)),
        onGetQuestion: (test_id, question_number) => dispatch(getQuestion(test_id, question_number)),
        resetQuestionNumber: () => dispatch(resetQuestionNumber()),
        setHeader: (text, loading = false, back = false) => dispatch({type: 'HEADER/SET', payload: {loading: loading, text: text, back: true}}),
    })
)(TestPreviewRoom);
