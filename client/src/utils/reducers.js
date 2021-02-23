import {
    UPDATE_USER,
    ADD_RO,
    REMOVE_RO,
    UPDATE_REQUEST_OFFS,
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
        
        case ADD_RO:
            return {
                ...state,
                requestOffs: [action.requestOffs]
            }

        case REMOVE_RO:
            let newState = state.requestOffs.filter(requestOff => {
                return requestOff._id !== action._id
            })

            return {
                ...state,
                requestOffs: newState
            }

        case UPDATE_REQUEST_OFFS:
            return {
                ...state,
                requestOffs: state.requestOffs.map(requestOff => {
                    if (action._id === requestOff._id) {
                        requestOff.approved = action.approved
                    }
                    return requestOff
                })
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