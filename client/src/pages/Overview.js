import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { iDBPromise } from '../utils/helpers'

import { QUERY_ME, QUERY_REQUEST_OFFS } from '../utils/queries'
import { UPDATE_USER, ALL_REQUESTS } from '../utils/actions'

const Overview = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)

    const { loading, data } = useQuery(QUERY_ME)
    const { loading: requestLoading, data: requestData } = useQuery(QUERY_REQUEST_OFFS)

    useEffect(() => {
        if(data) {
            dispatch({
                type: UPDATE_USER,
                employee: data.me
            })
            iDBPromise('employee', 'put', data.me)
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
            requestData.requestOffs.forEach(request => {
                iDBPromise('requestOffs', 'put', request)
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

    if (loading || requestLoading) {
        return (
            <div className="section">
                <h1 className="title has-text-centered">Loading</h1>
            </div>
        )
    }

    if (data.me.role === 'supervisor') {
        const unapprovedRequests = requestData.requestOffs.filter(request => request.approved === false)
        const approvedRequests = requestData.requestOffs.filter(request => request.approved === true)

        return (
            <section className="section">
                <h1 className="title has-text-centered">Welcome Back {data.me.firstName} {data.me.lastName}</h1>
                <div className="columns">
                    <div className="column">
                        <div className="notification is-info is-light">
                            <p className="title">Employee Info:</p>
                            <br />
                            <p className="subtitle">
                                Name: {data.me.firstName} {data.me.lastName}<br />
                                Phone Number: {data.me.phoneNumber}<br />
                                Email: {data.me.email}<br />
                                Role: Supervisor
                            </p>
                            <br />
                            <Link to={`/updateinfo/${data.me._id}`} className="button is-info is-outlined is-fullwidth">Change Info</Link>
                        </div>
                    </div>

                    <div className="column">
                        <div className="notification is-success is-light">
                            <p className="title">Approved Requests:</p>
                            <br />
                            <p className="subtitle">
                                You have {approvedRequests.length} approved requests coming up.
                            </p>
                            <br />
                            <Link to={`/directory/${data.me._id}`} className="button is-success is-outlined is-fullwidth">Find Coverage</Link>
                        </div>
                    </div>

                    <div className="column">
                        <div className="notification is-warning is-light">
                            <p className="title">Requests Needing Attention:</p>
                            <br />
                            <p className="subtitle">
                                You have {unapprovedRequests.length} requests waiting for approval.
                            </p>
                            <br />
                            <Link to={`/requestoff/${data.me._id}`} className="button is-warning is-outlined is-fullwidth">Review Them Now</Link>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
    else if (data.me.role === 'employee') {
        const requests = data.me.requestOffs
        let approvedRequests = []
        let unapprovedRequests = []

        if (!requests) {
            approvedRequests = requests
            unapprovedRequests = requests
        }
        else {
            unapprovedRequests = data.me.requestOffs.filter(request => request.approved === false)
            approvedRequests = data.me.requestOffs.filter(request => request.approved === true)
        }

        function displayRequest() {
            if (approvedRequests.length !== 0) {
                let paid = ''
                if (data.me.requestOffs[0].paidTimeOff) {
                    paid = "Yes"
                }
                else {
                    paid = 'No'
                }

                return (
                    <div>
                        <h1 className="subtitle">Next Trip:</h1>
                        <p>{data.me.requestOffs[0].timeOff}</p>
                        <p>{data.me.requestOffs[0].reason}</p>
                        <p>Paid: {paid}</p>
                    </div>
                )
            }
        }

        return (
            <section className="section">
                <h1 className="title has-text-centered">Welcome Back {data.me.firstName} {data.me.lastName}</h1>
                <div className="columns">
                    <div className="column is-full">
                        <div className="notification is-success is-light">
                            <p className="title">Upcoming Time Off:</p>
                            <br />
                            <p className="subtitle">
                                You have {approvedRequests.length} approved requests coming up.
                            </p>
                            <br />
                            {displayRequest()}
                            <br />
                            <Link to={`/requestoff/${data.me._id}`} className="button is-success is-outlined is-fullwidth">Submit Another Request</Link>
                        </div>
                    </div>
                </div>

                <div className="columns">
                    <div className="column">
                        <div className="notification is-warning is-light">
                            <p className="title">Pending Request Offs</p>
                            <br />
                            <p className="subtitle">
                                You have {unapprovedRequests.length} requests waiting for approval.
                            </p>
                            <br />
                            <Link to={`/directory/${data.me._id}`} className="button is-warning is-outlined is-fullwidth">Find Coverage</Link>
                        </div>
                    </div>

                    <div className="column">
                        <div className="notification is-info is-light">
                            <p className="title">Employee Info:</p>
                            <br />
                            <p className="subtitle">
                                Name: {data.me.firstName} {data.me.lastName}<br />
                                Phone Number: {data.me.phoneNumber}<br />
                                Email: {data.me.email}<br />
                                Role: Employee
                            </p>
                            <br />
                            <Link to={`/updateinfo/${data.me._id}`} className="button is-info is-outlined is-fullwidth">Change Info</Link>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Overview