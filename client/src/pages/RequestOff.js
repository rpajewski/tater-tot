import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import ApprovedRequests from '../components/ApprovedRequests'
import PendingRequests from '../components/PendingRequests'
import RequestOffForm from '../components/RequestOffForm'

const RequestOff = () => {
    const state = useSelector(state => state)

    const { employee, requestOffs } = state

    if (!state) {
        return (
            <div className="section">
                <h1 className="title has-text-centered">Loading</h1>
            </div>
        )
    }

    if (employee.role === 'supervisor') {
        const unapprovedRequests = requestOffs.filter(request => request.approved === false)
        const approvedRequests = requestOffs.filter(request => request.approved === true)

        return (
            <section className="section">
                <h1 className="title has-text-centered">Requests Offs</h1>

                <div className="columns">
                    <div className="column">
                        <div className="notification is-success is-light">
                            <p className="title">Approved Requests:</p>
                            <br />
                            {approvedRequests.length ? (
                                <div>
                                    {approvedRequests.map(request => (
                                        <ApprovedRequests
                                        key={request._id}
                                        _id={request._id}
                                        timeOff={request.timeOff}
                                        reason={request.reason}
                                        paidTimeOff={request.paidTimeOff}
                                        role="supervisor"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <h1 className="subtitle">There are no approved request offs yet.</h1>
                            )}
                            <br />
                        </div>
                    </div>
                </div>

                <div className="columns">
                    <div className="column">
                        <div className="notification is-warning is-light">
                            <p className="title">Requests Needing Attention:</p>
                            <br />
                            {unapprovedRequests.length ? (
                                <div>
                                    {unapprovedRequests.map(request => (
                                        <PendingRequests
                                        key= {request._id}
                                        _id= {request._id}
                                        timeOff= {request.timeOff}
                                        reason= {request.reason}
                                        paidTimeOff= {request.paidTimeOff}
                                        role="supervisor"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <h1 className="subtitle">There are no pending request offs yet.</h1>
                            )}
                            <br />
                        </div>
                    </div>
                </div>
            </section>
        )
    }
    else if (employee.role === 'employee') {
        const requests = employee.requestOffs
        let approvedRequests = []
        let unapprovedRequests = []

        if (!requests) {
            approvedRequests = requests
            unapprovedRequests = requests
        }
        else {
            unapprovedRequests = employee.requestOffs.filter(request => request.approved === false)
            approvedRequests = employee.requestOffs.filter(request => request.approved === true)
        }

        return (
            <section className="section">
                <h1 className="title has-text-centered">Requests Offs</h1>
                <div className="columns">
                    <div className="column">
                        <div className="notification is-info is-light">
                            <p className="title">Request Off Form:</p>
                            <br />
                                <RequestOffForm />
                            <br />
                        </div>
                    </div>
                </div>

                <div className="columns">
                    <div className="column">
                        <div className="notification is-success is-light">
                            <p className="title">Approved Requests:</p>
                            <br />
                            {approvedRequests.length ? (
                                <div>
                                    {approvedRequests.map(request => (
                                        <ApprovedRequests
                                        key={request._id}
                                        _id={request._id}
                                        timeOff={request.timeOff}
                                        reason={request.reason}
                                        paidTimeOff={request.paidTimeOff}
                                        role="employee"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <h1 className="subtitle">There are no approved request offs yet.</h1>
                            )}
                            <br />
                        </div>
                    </div>
                </div>

                <div className="columns">
                    <div className="column">
                        <div className="notification is-warning is-light">
                            <p className="title">Pending Requests:</p>
                            <br />
                            {unapprovedRequests.length ? (
                                <div>
                                    {unapprovedRequests.map(request => (
                                        <PendingRequests
                                        key= {request._id}
                                        _id= {request._id}
                                        timeOff= {request.timeOff}
                                        reason= {request.reason}
                                        paidTimeOff= {request.paidTimeOff}
                                        role="employee"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <h1 className="subtitle">There are no pending request offs yet.</h1>
                            )}
                            <br />
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default RequestOff