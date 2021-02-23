import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { iDBPromise } from '../utils/helpers'

import { QUERY_ME, QUERY_REQUEST_OFFS } from '../utils/queries'
import { UPDATE_USER, ALL_REQUESTS } from '../utils/actions'

const Overview = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    console.log(state)

    const { loading, data } = useQuery(QUERY_ME)
    const { loading: requestLoading, data: requestData } = useQuery(QUERY_REQUEST_OFFS)
    console.log(requestData)

    useEffect(() => {
        if(data) {
            dispatch({
                type: UPDATE_USER,
                employee: data.me
            })
            iDBPromise('employee', 'put', data.me)
            
            // if (data.me.requestOffs[0]) {
            //     dispatch({
            //         type: ADD_RO,
            //         requestOffs: data.me.requestOffs
            //     })
            //     data.me.requestOffs.forEach(request => {
            //         iDBPromise('requestOffs', 'put', request)
            //     })
            // }
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

    useEffect(() => {
        if (requestData) {
            dispatch({
                type: ALL_REQUESTS,
                requestOffs: requestData.requestOffs
            })
        }
        else if (!requestLoading) {
            iDBPromise('requestOffs', 'get').then((request) => {
                dispatch({
                    type: ALL_REQUESTS,
                    requestOffs: request
                })
            })
        }
    }, [requestData, requestLoading, dispatch])

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