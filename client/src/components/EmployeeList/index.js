import React from 'react'

const EmployeeList = (employee) => {
    const {
        _id,
        firstName,
        lastName,
        phoneNumber,
        email
    } = employee

    return (
        <div id={_id} className="box">
            <h1 className="title">{firstName} {lastName}</h1>
            <h1>Phone Number: {phoneNumber}</h1>
            <h1>Email: {email}</h1>
        </div>
    )
}

export default EmployeeList