import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_EMPLOYEE } from '../../utils/mutations'
import { iDBPromise } from '../../utils/helpers'

import { UPDATE_USER } from '../../utils/actions'

const UpdateInfoForm = () => {
    const state = useSelector(state => state)
    const { employee } = state
    const dispatch = useDispatch()
    const [formState, setFormState] = useState({ phoneNumber: '', email: '' })
    const [updateEmployee, {error}] = useMutation(UPDATE_EMPLOYEE)

    const updateEmployeeInfo = (employee) => {
        dispatch({
            type: UPDATE_USER,
            employee: employee.updateEmployee
        })
        iDBPromise('employee', 'put', employee.updateEmployee)
    }

    const handleChange = event => {
        const { name, value } = event.target

        setFormState({
            ...formState,
            [name]: value,
        })
    }

    const handleFormSubmit = async event => {
        event.preventDefault()

        if (!formState.email) {
            formState.email = employee.email
        }
        else if (!formState.phoneNumber) {
            formState.phoneNumber = employee.phoneNumber
        }

        try {
            const { data } = await updateEmployee({
                variables: { ...formState }
            })
            updateEmployeeInfo(data)
        }
        catch (err) {
            console.error(err)
        }
        window.location.assign(`/overview/${employee._id}`)
    }

    return (
            <div className="columns is-vcentered">
                <div className="box column is-10 is-offset-1">
                    <form id="form" onSubmit={handleFormSubmit}>
                        <div className="field">
                            <label className="label">Phone Number:</label>
                            <p className="control has-icons-left has-icons-right">
                                <input className="input" type="phoneNumber" name="phoneNumber" id="phoneNumber" placeholder="e.g 111-111-1111" value={formState.phoneNumber} onChange={handleChange}></input>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-phone"></i>
                                </span>
                            </p>
                        </div>

                        <div className="field">
                            <label className="label">Email:</label>
                            <p className="control has-icons-left has-icons-right">
                                <input className="input" type="email" name="email" id="email" placeholder="e.g myemail@email.com" value={formState.email} onChange={handleChange}></input>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-envelope"></i>
                                </span>
                            </p>
                        </div>

                        <div className="field">
                            <button className="button is-primary" type="submit">Submit</button>
                        </div>
                    </form>
                    {error && <div>Request Off Submission Failed</div>}
                </div>
            </div>
    )
}

export default UpdateInfoForm