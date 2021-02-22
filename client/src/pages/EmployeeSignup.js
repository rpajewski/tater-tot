import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import Auth from '../utils/auth'
import { ADD_EMPLOYEE } from '../utils/mutations'

function EmployeeSignup(props) {
    const [formState, setFormState] = useState({ firstName: '', lastName: '', phoneNumber: '', email: '', password: '', role: 'employee' })
    const [addEmployee, { error }] = useMutation(ADD_EMPLOYEE)

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormState({
            ...formState,
            [name]: value,
        })
    }

    const handleFormSubmit = async event => {
        event.preventDefault()

        try {
            const { data } = await addEmployee({
                variables: { ...formState }
            })
            Auth.login(data.addEmployee.token)
        }
        catch (err) {
            console.error(err)
        }
    }

    return (
    <section className="box">
        <form onSubmit={handleFormSubmit}>
            <div className="field">
                <label className="label">First Name:</label>
                <div className="control has-icons-left has-icons-right">
                    <input className="input" type="text" name="firstName" id="firstName" placeholder="e.g John" value={formState.firstName} onChange={handleChange}></input>
                    <span className="icon is-small is-left">
                        <i className="fas fa-user"></i>
                    </span>
                </div>
            </div>

            <div className="field">
                <label className="label">Last Name:</label>
                <div className="control has-icons-left has-icons-right">
                    <input className="input" type="text" name="lastName" id="lastName" placeholder="e.g Smith" value={formState.lastName} onChange={handleChange}></input>
                    <span className="icon is-small is-left">
                        <i className="fas fa-user"></i>
                    </span>
                </div>
            </div>

            <div className="field">
                <label className="label">Phone Number:</label>
                <p className="control has-icons-left has-icons-right">
                    <input className="input" type="tel" name="phoneNumber" id="phoneNumber" placeholder="Phone" value={formState.phoneNumber} onChange={handleChange}></input>
                    <span className="icon is-small is-left">
                        <i className="fas fa-phone"></i>
                    </span>
                </p>
            </div>

            <div className="field">
                <label className="label">Email:</label>
                <p className="control has-icons-left has-icons-right">
                    <input className="input" type="email" name="email" id="email" placeholder="Email" value={formState.email} onChange={handleChange}></input>
                    <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                    </span>
                </p>
            </div>

            <div className="field">
                <label className="label">Password:</label>
                <p className="control has-icons-left has-icons-right">
                    <input className="input" type="password" name="password" id="password" placeholder="Password" value={formState.password} onChange={handleChange}></input>
                    <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                    </span>
                </p>
            </div>

            <div className="field">
                <button className="button is-primary" type="submit">Submit</button>
            </div>
        </form>
        {error && <div>Sign Up Failed</div>}
    </section>
    )
}

export default EmployeeSignup