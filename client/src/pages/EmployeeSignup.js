import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import Auth from '../utils/auth'
import { ADD_EMPLOYEE } from '../utils/mutations'
import signupphoto from '../assets/images/sign-up-photo.jpg'

function EmployeeSignup(props) {
    const [formState, setFormState] = useState({ firstName: '', lastName: '', phoneNumber: '', email: '', password: '', role: 'employee' })
    const [addEmployee, { error }] = useMutation(ADD_EMPLOYEE)

    const handleChange = event => {
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
    <section className="section">
        <div className="columns">
            <div className="column"></div>
            <div className="box column is-one-third">
                <form onSubmit={handleFormSubmit}>
                    <div className="field">
                        <label className="label">First Name:</label>
                        <div className="control has-icons-left has-icons-right">
                            <input className="input" type="text" name="firstName" id="firstName" placeholder="e.g John" onChange={handleChange}></input>
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Last Name:</label>
                        <div className="control has-icons-left has-icons-right">
                            <input className="input" type="text" name="lastName" id="lastName" placeholder="e.g Smith" onChange={handleChange}></input>
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Phone Number:</label>
                        <p className="control has-icons-left has-icons-right">
                            <input className="input" type="tel" name="phoneNumber" id="phoneNumber" placeholder="Phone" onChange={handleChange}></input>
                            <span className="icon is-small is-left">
                                <i className="fas fa-phone"></i>
                            </span>
                        </p>
                    </div>

                    <div className="field">
                        <label className="label">Email:</label>
                        <p className="control has-icons-left has-icons-right">
                            <input className="input" type="email" name="email" id="email" placeholder="Email" onChange={handleChange}></input>
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                        </p>
                    </div>

                    <div className="field">
                        <label className="label">Password:</label>
                        <p className="control has-icons-left has-icons-right">
                            <input className="input" type="password" name="password" id="password" placeholder="Password" onChange={handleChange}></input>
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
            </div>

            <div className="column"></div>

            <div className="column is-one-third">
                <figure className="image is-256x256">
                    <img className="is-rounded" src={signupphoto}></img>
                </figure>
            </div>

            <div className="column"></div>
        </div>
    </section>
    )
}

export default EmployeeSignup