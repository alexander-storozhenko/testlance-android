export const testPreviewInfo = (state = {}, action) => {
    if (action.type === 'TEST/GET_PREVIEW_INFO_SUCCESS') {
        return action.payload
    }
    return state
}

export const testPreviewLoading = (state = false, action) => {
    return action.type === 'TEST/GET_PREVIEW_INFO_PROGRESS'
}

export const testTData = (state = null, action) => {
    if (action.type === 'TEST/SET_TEST_T_DATA')
        return action.payload
    return state
}

export const testTDeleteProgress = (state = false, action) => {
    if (action.type === 'TEST/DELETE/PROGRESS')
        return action.payload.progress
    return state
}

export const testTDeleteSuccess = (state = false, action) => {
    if (action.type === 'TEST/DELETE/SUCCESS')
        return action.payload.id
    return state
}