import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { iDBPromise } from '../utils/helpers'

import { QUERY_ME } from '../utils/queries'
import { UPDATE_USER, ADD_RO } from '../utils/actions'

const Overview = () => {
    const { id: employeeId } = useParams()
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    console.log(state)

    const { loading, data } = useQuery(QUERY_ME)

    useEffect(() => {
        if(data) {
            dispatch({
                type: UPDATE_USER,
                employee: data.me
            })
            iDBPromise('employee', 'put', data.me)
            
            if (data.me.requestOffs[0]) {
                dispatch({
                    type: ADD_RO,
                    requestOffs: data.me.requestOffs
                })
                data.me.requestOffs.forEach(request => {
                    iDBPromise('requestOffs', 'put', request)
                })
            }
        }
        else if (!loading) {
            iDBPromise('employee', 'get').then((employee) => {
                dispatch({
                    type: UPDATE_USER,
                    employee: employee
                })
            })
        }
    }, [data, loading, dispatch])

    function checkForRequests() {
        const requests = data.me.requestOffs
        if (requests[0]) {
            return (
                <h1>testing</h1>
            )
        }
        else {
            return (
                <h1>this should show up without requests</h1>
            )
        }
    }

    if (loading) {
        return (
            <div>
                <h1>Loading</h1>
            </div>
        )
    }

    return (
        <div>
            <h1>Overview</h1>
            {checkForRequests()}
        </div>
    )
}

export default Overview