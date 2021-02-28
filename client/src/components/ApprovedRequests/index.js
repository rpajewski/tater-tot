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
        paidTimeOff = <i className="fas fa-dollar-sign"></i>
    }
    else {
        paidTimeOff = <i className="fab fa-creative-commons-nc"></i>
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