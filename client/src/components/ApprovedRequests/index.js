import React from 'react'

const ApprovedRequests = (request) => {
    const {
        _id,
        timeOff,
        reason,
        approved,
        approvedOn
    } = request

    let { paidTimeOff } = request
    if (paidTimeOff) {
        paidTimeOff = 'Paid - Dont spend it all in one place'
    }
    else {
        paidTimeOff = 'Not paid time off'
    }

    return (
        <div className="box">
            <h1 className="title">{timeOff}</h1>
            <br />
            <p className="subtitle">{reason}</p>
            <h1>{paidTimeOff}</h1>
        </div>
    )
}

export default ApprovedRequests