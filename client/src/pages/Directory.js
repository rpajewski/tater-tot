import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { iDBPromise } from '../utils/helpers'

import { QUERY_EMPLOYEES } from '../utils/queries'
import { UPDATE_EMPLOYEES } from '../utils/actions'
import EmployeeList from '../components/EmployeeList'

const Directory = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)

    const { loading, data } = useQuery(QUERY_EMPLOYEES)

    useEffect(() => {
        if(data) {
            dispatch({
                type: UPDATE_EMPLOYEES,
                employees: data.employees
            })
            data.employees.forEach(employees => {
                iDBPromise('employees', 'put', employees)
            })
        }
        else if (!loading) {
            iDBPromise('employees', 'get').then((employees) => {
                dispatch({
                    type: UPDATE_EMPLOYEES,
                    employees: employees
                })
            })
        }
    }, [data, loading, dispatch])

    if (loading) {
        return (
            <div className="section">
                <h1 className="title has-text-centered">Loading</h1>
            </div>
        )
    }

    return (
        <section className="section">
            <h1 className="title has-text-centered">Employee Directory</h1>
            {data.employees.length ? (
                <div className="notification is-info is-light">
                    {data.employees.map(employee => (
                        <EmployeeList
                        key={employee._id}
                        _id={employee._id}
                        firstName={employee.firstName}
                        lastName={employee.lastName}
                        phoneNumber={employee.phoneNumber}
                        email={employee.email}
                        />
                    ))}
                </div>
            ) : (
                <div className="box">
                    <h1 className="subtitle">There are no approved request offs yet.</h1>
                </div>
            )}
        </section>
    )
}

export default Directory