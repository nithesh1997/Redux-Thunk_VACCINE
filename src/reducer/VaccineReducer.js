const initialState = {
    data: [],
    editData: {}
}

const VaccineReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'DATA_SUCCESS': return {
            ...state,
            data: action.payload.reverse()
        }
        case 'EDIT_DATA': return {
            ...state,
            editData: action.payload
        }
        default: return state
    }
}

export default VaccineReducer