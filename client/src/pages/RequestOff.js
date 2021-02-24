import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { iDBPromise } from '../utils/helpers'

import { UPDATE_USER, ALL_REQUESTS } from '../utils/actions'

const RequestOff = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)

    const { employee, requestOffs } = state
    console.log(employee)
    console.log(requestOffs)

    return (
        <div>
            <h1>Request Off</h1>
        </div>
    )
}

export default RequestOff