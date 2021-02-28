import {
    UPDATE_USER,
    ALL_REQUESTS,
    UPDATE_REQUESTS,
    UPDATE_EMPLOYEES
} from './actions'

const initialState = {
    employee: '',
    requestOffs: [],
    employees: []
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case UPDATE_USER:
            return {
                ...state,
                employee: action.employee
            }

        case ALL_REQUESTS:
            return {
                ...state,
                requestOffs: [...action.requestOffs]
            }
        
        case UPDATE_REQUESTS:
            return {
                ...state,
                requestOffs: [...state.requestOffs, action.requestOff]
            }

        case UPDATE_EMPLOYEES:
            return {
                ...state,
                employees: [...action.employees]
            }

        default:
            return state
    }
}

export default reducer