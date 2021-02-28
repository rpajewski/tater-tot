import React from 'react'
import { useDispatch } from 'react-redux'

const PendingRequests = (request) => {
    const {
        _id,
        employeeId,
        timeOff,
        reason,
        approvedOn,
        role
    } = request

    let { paidTimeOff } = request
    if (paidTimeOff) {
        paidTimeOff = <i className="fas fa-dollar-sign"></i>
    }
    else {
        paidTimeOff = <i className="fab fa-creative-commons-nc"></i>
    }

    const handleChange = value => {
        if (value === 'approved') {

        }
        else {

        }
    }

    if (role === 'supervisor') {
        return (
            <div className="box">
                <h1 className="title">{timeOff} - {paidTimeOff}</h1>
                <p className="subtitle">{reason}</p>
                <div className="select is-rounded is-warning">
                    <select key={_id} onChange={(val) => handleChange(val.target.value)}>
                        <option value="unapproved">Unapproved</option>
                        <option value="approved">Approve</option>
                    </select>
                </div>
            </div>
        )
    }

    return (
        <div className="box">
            <h1 className="title">{timeOff} - {paidTimeOff}</h1>
            <p className="subtitle">{reason}</p>
        </div>
    )
}

export default PendingRequests