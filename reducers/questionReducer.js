export const question = (state = null, action) => {
    if (action.type === 'QUESTION/GET_SUCCESS') {
        return action.payload
    }
    return state
}

export const questionNumber = (state = 0, action) => {
    if (action.type === 'QUESTION/INCREASE_NUMBER') {
        state += 1
    }
    else if (action.type === 'QUESTION/DECREASE_NUMBER') {
        state -= 1
    }
    return state
}

export const questionLoading = (state= false, action) => {
    return action.type === 'QUESTION/GET_PROGRESS'
}
